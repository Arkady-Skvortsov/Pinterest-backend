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
    @MessageBody() payload: CreateMessagesDTO<string>,
    room: string,
  ): string {
    try {
      this.server.to(room).emit('message');

      return `you send ${payload}`;
    } catch (e) {
      throw new WsException(
        `Не удалось отправить сообщение пользователю ${client.id}`,
      );
    }
  }

  @SubscribeMessage('join')
  joinCurrentRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ) {
    try {
      client.join(room);

      this.server.to(room).emit('notify');

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

      this.server.emit('notify');

      console.log(`${client.id} leave ${client.rooms[room]}`);
    } catch (e) {
      throw new WsException(`Не удалось отключиться от ${room} комнаты`);
    }
  }
}
