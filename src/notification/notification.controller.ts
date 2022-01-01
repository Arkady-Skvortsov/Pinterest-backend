import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthGuard } from '../auth/auth.guard';
import NotificationEntity from '../entities/notification.entity';
import { CacheInterceptor } from '../redis/cache.interceptor';
import { RequestCustom } from '../interfaces/auth.interface';
import INotification from '../interfaces/notification.interface';
import { CacheType } from '../decorators/cache.decorator';
import { RequestType } from 'src/decorators/request.decorator';

@ApiTags('Notification')
@UseInterceptors(CacheInterceptor)
@CacheType('notification')
@UseGuards(AuthGuard)
@Controller('notification')
export class NotificationController implements INotification {
  constructor(private notificationService: NotificationService) {}

  @ApiOperation({ summary: 'Get all notification of current user' })
  @ApiResponse({ type: () => [NotificationEntity], status: 200 })
  @Get('/all')
  async getNotifications(
    @Request() request: RequestCustom,
  ): Promise<NotificationEntity[]> {
    try {
      return this.notificationService.getAllNotifications(request.user);
    } catch (e) {
      throw new HttpException(
        'Не удалось получить все уведомления',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Get current notification by id' })
  @ApiResponse({ type: () => NotificationEntity, status: 200 })
  @UseInterceptors(CacheType('notification'))
  @Get('/current/:id')
  async getCurrentNotification(
    @Request() request: RequestCustom,
    @Param() id: number,
  ) {
    try {
      return this.notificationService.getCurrentNotification(request.user, id);
    } catch (e) {
      throw new HttpException(
        `Не удалось получить ${id}е уведомление`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Delete current notification by id' })
  @ApiResponse({ type: Number, status: 204 })
  @Delete('/delete/:id')
  async deleteCurrentNotification(
    @Request() request: RequestCustom,
    @Param() id: number,
  ) {
    try {
      return this.notificationService.deleteCurrentNotification(
        request.user,
        id,
      );
    } catch (e) {
      throw new HttpException(
        `Не удалось удалить ${id}е уведомление`,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
