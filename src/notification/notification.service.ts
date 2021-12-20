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
  ) {}

  async getAllNotifications(user: UserEntity): Promise<NotificationEntity[]> {
    return user.notifications;
  }

  async getCurrentNotification(
    user: UserEntity,
    id: number,
  ): Promise<NotificationEntity> {
    const notification = user.notifications
      .filter((notif) => notif.id === id)
      .pop();

    return notification;
  }

  async deleteCurrentNotification(
    user: UserEntity,
    id: number,
  ): Promise<number> {
    const notification = user.notifications
      .filter((notif) => notif.id === id)
      .pop();

    await this.notificationEntity.delete(notification);

    return notification.id;
  }
}

export class NotificationObserverService {
  private subscribers: subscriber<UserEntity>[] = [];

  constructor(
    @InjectRepository(NotificationEntity)
    private notificationEntity: Repository<NotificationEntity>,
  ) {}

  async notifyAll(
    data: CreateNotificationDTO<string>,
    payload: subscriber<UserEntity>,
  ): Promise<subscriber<UserEntity>[]> {
    //const { user } = await this.jwtTokenService.findToken('');

    // let currentSubscriber = await this.subscribers.map((subscribe) => {
    //   subscribe.subscribers.filter((subscriber) => subscriber === user);
    // });

    // this.subscribers.forEach((subscribe) => {
    //   subscribe.subscribers.map((sub) => {   });
    // });

    return this.subscribers;
  }

  async subscribe(payload: subscriber<UserEntity>): Promise<string> {
    const { author, subscribers } = payload;

    subscribers.forEach((subscriber) => {
      if (subscriber.username === author.username) {
        return;
      }
    });

    this.subscribers.push({ author, subscribers });

    return `Вы подписались на "${author.username}"`;
  }

  async unsubscribe(payload: subscriber<UserEntity>): Promise<string> {
    const { author, subscribers } = payload;

    this.subscribers.filter((subscriber) => subscriber !== subscriber); //Todo: Fix that later

    return `Вы отписались от "${author.username}"`;
  }

  private async createNotification(
    dto: CreateNotificationDTO<string>,
    payload: subscriber<UserEntity>,
  ): Promise<NotificationEntity> {
    const { author, subscribers } = payload;

    const newNotification = await this.notificationEntity.create({
      ...dto,
      users: subscribers,
      author: author,
    });

    return newNotification;
  }
}
