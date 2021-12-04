import { Logger, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CacheInterceptor } from '../redis/cache.interceptor';
import { AuthGuard } from '../auth/auth.guard';
import { UsersGuard } from '../users/users.guard';
import { ChatService } from './chat.service';
import { MessagesPipe } from '../messages/messages.pipe';

@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard, UsersGuard)
@WebSocketGateway(3502, {
  serveClient: true,
  namespace: '/chat',
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private chatService: ChatService) {}

  @WebSocketServer() private server: Server;

  private logger: Logger = new Logger('ChatGateway');

  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(socket: Socket) {
    this.logger.log(`Client ${socket.id} had been connected`);
  }

  handleDisconnect(socket: Socket) {
    this.logger.log(`Client ${socket.id} had been disconnected`);
  }

  @UsePipes(MessagesPipe)
  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ): string {
    try {
      return '';
    } catch (e) {
      throw new WsException(
        `Не удалось отправить сообщение пользователю ${client}`,
      );
    }
  }

  @SubscribeMessage('delete')
  deleteMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ): string {
    try {
      return '';
    } catch (e) {
      throw new WsException('Не удалось удалить сообщение');
    }
  }

  @SubscribeMessage('join')
  joinCurrentRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ) {
    try {
      client.join(room);

      console.log(`${client.id} connect to ${client.rooms[room]}`);
    } catch (e) {
      throw new WsException(`Не удалось подключиться к ${room} комнате`);
    }
  }

  @SubscribeMessage('leave')
  leaveCurrentRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ) {
    try {
      client.leave(room);

      console.log(`${client.id} leave ${client.rooms[room]}`);
    } catch (e) {
      throw new WsException(`Не удалось отключиться от ${room} комнаты`);
    }
  }

  @SubscribeMessage('like')
  likeMessages(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ): string {
    return '';
  }

  @SubscribeMessage('deleteChat')
  deleteChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ): string {
    try {
      return '';
    } catch (e) {
      throw new WsException('Не удалось удалить чат');
    }
  }
}
