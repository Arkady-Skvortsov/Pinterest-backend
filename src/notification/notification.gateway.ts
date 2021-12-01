import { UseGuards, UseInterceptors } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsException,
} from '@nestjs/websockets';
import { AuthGuard } from '../auth/auth.guard';
import CreateNotificationDTO from '../dto/notification.dto';
import { CacheInterceptor } from '../redis/cache.interceptor';
import { WsAdapter } from '../ws.adapter';
import { NotificationObserverService } from './notification.service';

@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard)
@WebSocketGateway()
export class NotificationGateway {
  constructor(
    private notificationObserverService: NotificationObserverService,
  ) {}

  @SubscribeMessage('notification')
  handleNotification(
    client: WsAdapter,
    @MessageBody() payload: CreateNotificationDTO<string>,
  ): string {
    try {
      //return this.notificationObserverService.notifyAll(payload);
      return 'new notification!';
    } catch (e) {
      throw new WsException('Не удалось отправить оповещение');
    }
  }
}
