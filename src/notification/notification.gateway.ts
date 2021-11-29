import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { WsAdapter } from 'src/ws.adapter';

@WebSocketGateway()
export class NotificationGateway {
  @SubscribeMessage('notification')
  handleNotification(client: WsAdapter, payload: any): string {
    return 'Hello world!';
  }
}
