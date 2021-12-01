import { UseGuards, UseInterceptors } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { CacheInterceptor } from '../redis/cache.interceptor';
import { AuthGuard } from '../auth/auth.guard';
import { WsAdapter } from '../ws.adapter';

@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard)
@WebSocketGateway()
export class ChatGateway {
  @SubscribeMessage('message')
  handleMessage(client: WsAdapter, @MessageBody() payload: any): string {
    return 'Hello world!';
  }

  @SubscribeMessage('leave')
  replyMessage(client: WsAdapter, @MessageBody() payload: any): string {
    return 'wtf';
  }

  @SubscribeMessage('like')
  likeMessages(client: WsAdapter, @MessageBody() payload: any): string {
    return '';
  }
}
