import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { subscriber } from '../dto/notification.dto';
import UserEntity from '../entities/users.entity';
import NotificationEntity from '../entities/notification.entity';
import CreateNotificationDTO from '../dto/notification.dto';

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
    const notification = user.notifications.find((notif) => notif.id === id);

    return notification;
  }

  async deleteCurrentNotification(
    user: UserEntity,
    id: number,
  ): Promise<number> {
    const notification = await this.getCurrentNotification(user, id);

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
    const newNotification = await this.createNotification(data, payload);

    const { subscribers } = payload;

    // subscribers.forEach((subscriber) => subscriber.). Todo: add method of notify all to the all subscribers

    return this.subscribers;
  }

  async subscribe(payload: subscriber<UserEntity>): Promise<string> {
    const { author, subscribers } = payload;

    subscribers.forEach((subscriber) => {
      if (subscriber.username === author.username) {
        throw new Error();
      }
    });

    this.subscribers.push({ author, subscribers });

    // await this.usersService.subscribe();

    return `Вы подписались на "${author.username}"`;
  }

  async unsubscribe(
    username: string,
    payload: subscriber<UserEntity>,
  ): Promise<string> {
    const { author, subscribers } = payload;

    const currentSubscriber = subscribers.find(
      (subscriber) => subscriber.username === username,
    );

    this.subscribers.map((podsub) =>
      podsub.subscribers.filter((sub) => sub !== currentSubscriber),
    );

    // await this.usersService.unsubscribe(user, username);

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
