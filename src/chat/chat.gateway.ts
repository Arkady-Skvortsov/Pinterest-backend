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
import CreateMessagesDTO from '../dto/messages.dto';
import { RequestType } from '../decorators/request.decorator';

@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard, UsersGuard)
@RequestType('ws')
@WebSocketGateway(3505, {
  serveClient: true,
  namespace: 'chat',
  transports: ['websockets'],
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
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
    @MessageBody() payload: CreateMessagesDTO,
    username: string,
  ): string {
    try {
      this.server.to(username).emit('message', payload);

      return `you send ${payload.text} to ${payload.catcher}`;
    } catch (e) {
      throw new WsException(
        `Не удалось отправить сообщение пользователю ${payload.catcher}`,
      );
    }
  }

  @SubscribeMessage('join')
  joinCurrentRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ): string {
    try {
      client.join(room);

      this.server.to(room).emit('notify');

      return `${client.id} connect to ${client.rooms[room]}`;
    } catch (e) {
      throw new WsException(`Не удалось подключиться к "${room}" комнате`);
    }
  }

  @SubscribeMessage('leave')
  leaveCurrentRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ): string {
    try {
      client.leave(room);

      this.server.emit('notify');

      return `${client.id} leave ${client.rooms[room]}`;
    } catch (e) {
      throw new WsException(`Не удалось отключиться от "${room}" комнаты`);
    }
  }
}
