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
import { RequestType } from '../decorators/request.decorator';
import { AuthGuard } from '../auth/auth.guard';
import CreateNotificationDTO from '../dto/notification.dto';
import { CacheInterceptor } from '../redis/cache.interceptor';
import { NotificationObserverService } from './notification.service';

@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard)
@RequestType('ws')
@WebSocketGateway(3506, {
  cors: '*',
  serveClient: true,
  transports: ['websockets'],
  namespace: 'notification',
})
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private notificationObserverService: NotificationObserverService,
  ) {}

  private logger: Logger = new Logger('NotificationGateway');

  @WebSocketServer() private server: Server;

  afterInit() {
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
    @MessageBody() payload: CreateNotificationDTO,
  ): string {
    try {
      this.server.to(payload.channel).emit('notification', payload);

      return `Notification had been sended to ${payload.user} user from ${payload.author}`;
    } catch (e) {
      throw new WsException('Не удалось отправить оповещение');
    }
  }

  @SubscribeMessage('join')
  joinCurrentRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() author: string,
  ) {
    try {
      client.join(author);

      this.server.to(author).emit('notification'); //Todo: fix problems with understanding of the WS channel
    } catch (e) {
      throw new WsException(
        `Не удалось создать канал "${author}" для уведомлений`,
      );
    }
  }

  @SubscribeMessage('drop')
  dropCurrentRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() author: string,
  ) {
    try {
      client.leave(author);

      this.server.emit('notification');
    } catch (e) {
      throw new WsException(`Не удалось покинуть канал ${author} комнату`);
    }
  }
}
