import { Logger, UseGuards, UseInterceptors } from '@nestjs/common';
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
import { Socket, Server } from 'socket.io';
import { AuthGuard } from '../auth/auth.guard';
import CreateNotificationDTO from '../dto/notification.dto';
import { CacheInterceptor } from '../redis/cache.interceptor';
import { NotificationObserverService } from './notification.service';

@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard)
@WebSocketGateway(3501, {
  serveClient: true,
  namespace: '/notification',
})
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private notificationObserverService: NotificationObserverService,
  ) {}

  private logger: Logger = new Logger('NotificationGateway');

  @WebSocketServer() private server: Server;

  afterInit(server: Server) {
    this.logger.log('Inicialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client ${client.id} had been connected`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client ${client.id} had been disconnect`);
  }

  @SubscribeMessage('notification')
  handleNotification(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: CreateNotificationDTO<string>,
    room: string,
  ) {
    try {
      this.server.to(room);

      return this.notificationObserverService.notifyAll(payload);
    } catch (e) {
      throw new WsException('Не удалось отправить оповещение');
    }
  }

  @SubscribeMessage('join')
  joinCurrentRoom(@ConnectedSocket() client: Socket, room: string) {
    try {
      client.join(room);
    } catch (e) {
      throw new WsException('Не удалось создать канал для уведомлений ');
    }
  }

  @SubscribeMessage('drop')
  dropCurrentRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ) {
    try {
      client.leave(room);
    } catch (e) {
      throw new WsException('Не удалось сломать комнату');
    }
  }
}
