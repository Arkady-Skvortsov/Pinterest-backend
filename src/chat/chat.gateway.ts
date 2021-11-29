import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'net';

@WebSocketGateway()
export class ChatGateway {
  @SubscribeMessage('message')
  handleMessage(client: Socket, @MessageBody() payload: any): string {
    return 'Hello world!';
  }
}
