import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import NotificationEntity from 'src/entities/notification.entity';

@Injectable()
export class NotificationObserverService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notificationEntity: Repository<NotificationEntity>,
  ) {}

  private subscribers = [];

  async notifyAll(data: any) {
    const newNotification = await this.createNotification(data);

    this.subscribers.forEach((subscriber) =>
      subscriber.notify(newNotification),
    );
  }

  async subscribe(user) {
    this.subscribers.push(user);
  }

  async unsubscribe(user) {
    this.subscribers.filter((subscriber) => !(typeof subscriber !== user));
  }

  private async createNotification(dto: any) {
    const notification = await this.notificationEntity.create(dto);

    return notification;
  }
}
