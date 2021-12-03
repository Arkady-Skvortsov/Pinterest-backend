import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { subscriber } from '../dto/notification.dto';
import NotificationEntity from '../entities/notification.entity';
import CreateNotificationDTO from '../dto/notification.dto';
import UserEntity from '../entities/users.entity';

@Injectable()
export class NotificationObserverService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notificationEntity: Repository<NotificationEntity>,
  ) {}

  private subscribers: subscriber<UserEntity>[] = [];

  async notifyAll(data: CreateNotificationDTO<string>) {
    const newNotification = 1;
    //const newNotification = await this.createNotification(data);
    // this.subscribers.forEach((subscriber) => subscriber.subscribers.notify(''));
  }

  async subscribe(payload: subscriber<UserEntity>) {
    const { author, subscribers } = payload;

    subscribers.forEach((subscriber) => {
      if (subscriber.username === author.username) {
        return;
      }
    });

    this.subscribers.push({ author, subscribers });
  }

  async unsubscribe(payload: subscriber<UserEntity>) {
    const { author, subscribers } = payload;

    //this.subscribers.filter((subscriber) => subscriber !== user);
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
