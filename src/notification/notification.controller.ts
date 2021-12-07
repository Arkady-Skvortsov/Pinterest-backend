import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Notification')
@UseGuards(AuthGuard)
@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

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
