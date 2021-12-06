import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Socket } from 'socket.io';
import { subscriber } from '../dto/notification.dto';
import UserEntity from '../entities/users.entity';
import NotificationEntity from '../entities/notification.entity';
import CreateNotificationDTO from '../dto/notification.dto';
import { JwtTokenService } from '../jwt-token/jwt-token.service';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notificationEntity: Repository<NotificationEntity>,
    private jwtTokenService: JwtTokenService,
  ) {}

  async getAllNotifications(token: string): Promise<NotificationEntity[]> {
    const { user } = await this.jwtTokenService.findToken(token);

    return user.notifications;
  }

  async getCurrentNotification(
    token: string,
    id: number,
  ): Promise<NotificationEntity> {
    const { user } = await this.jwtTokenService.findToken(token);

    const notification = user.notifications
      .filter((notif) => notif.id === id)
      .pop();

    return notification;
  }

  async deleteCurrentNotification(token: string, id: number): Promise<number> {
    const { user } = await this.jwtTokenService.findToken(token);

    const notification = user.notifications
      .filter((notif) => notif.id === id)
      .pop();

    await this.notificationEntity.delete(notification);

    return notification.id;
  }
}

@Injectable()
export class NotificationObserverService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notificationEntity: Repository<NotificationEntity>,
  ) {}

  private subscribers: subscriber<UserEntity>[] = [];

  async notifyAll(
    data: CreateNotificationDTO<string>,
    payload: subscriber<UserEntity>,
  ): Promise<subscriber<UserEntity>[]> {
    let ws: Socket;

    ws.emit('notify');
    const newNotification = await this.createNotification(data, payload);

    // this.subscribers.forEach((subscribe) => {
    //   subscribe.subscribers.forEach((sub) => {});
    // });

    return this.subscribers;
  }

  async subscribe(payload: subscriber<UserEntity>): Promise<string> {
    let ws: Socket;
    const { author, subscribers } = payload;

    subscribers.forEach((subscriber) => {
      if (subscriber.username === author.username) {
        return;
      }
    });

    this.subscribers.push({ author, subscribers });

    ws.on('subscribe', (payload) => this.subscribe(payload)); //Todo: Fix websockets emit later

    return `You have subscribed on the ${author.username}`;
  }

  async unsubscribe(payload: subscriber<UserEntity>): Promise<string> {
    let ws: Socket;
    const { author, subscribers } = payload;

    //this.subscribers.filter((subscriber) => subscriber !== ?); Todo: Fix that later

    ws.emit('unsubscribe');

    return `You have unsubscibed from ${author.username}`;
  }

  private async createNotification(
    dto: CreateNotificationDTO<string>,
    payload: subscriber<UserEntity>,
  ): Promise<NotificationEntity> {
    const { author, subscribers } = payload;

    const newNotification = await this.notificationEntity.create({
      ...dto,
      user: subscribers[0],
      author: author,
    });

    console.log(newNotification);

    return newNotification;
  }
}
