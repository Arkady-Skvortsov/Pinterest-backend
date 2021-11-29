import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsException,
} from '@nestjs/websockets';
import CreateNotificationDTO from 'src/dto/notification.dto';
import { WsAdapter } from 'src/ws.adapter';
import { NotificationObserverService } from './notification.service';

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
