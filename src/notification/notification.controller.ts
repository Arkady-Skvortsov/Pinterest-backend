import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthGuard } from '../auth/auth.guard';
import NotificationEntity from '../entities/notification.entity';
import { CacheInterceptor } from '../redis/cache.interceptor';

@ApiTags('Notification')
@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard)
@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @ApiOperation({ summary: 'Get all notification of current user' })
  @ApiResponse({ type: () => [NotificationEntity], status: 200 })
  @Get('/all')
  async getNotifications(token: string) {
    try {
      return this.notificationService.getAllNotifications(token);
    } catch (e) {
      throw new HttpException(
        'Не удалось получить все уведомления',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Get current notification by id' })
  @ApiResponse({ type: () => NotificationEntity, status: 200 })
  @Get('/current/:id')
  async getCurrentNotification(token: string, @Param() id: number) {
    try {
      return this.notificationService.getCurrentNotification(token, id);
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
  async deleteCurrentNotification(token: string, @Param() id: number) {
    try {
      return this.notificationService.deleteCurrentNotification(token, id);
    } catch (e) {
      throw new HttpException(
        `Не удалось удалить ${id}е уведомление`,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
