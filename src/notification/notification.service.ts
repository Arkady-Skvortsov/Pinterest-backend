import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import NotificationEntity from 'src/entities/notification.entity';
import CreateNotificationDTO from 'src/dto/notification.dto';
import UserEntity from 'src/entities/users.entity';

@Injectable()
export class NotificationObserverService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notificationEntity: Repository<NotificationEntity>,
  ) {}

  private subscribers = [];

  async notifyAll(data: CreateNotificationDTO<string>) {
    const newNotification = await this.createNotification(data);

    this.subscribers.forEach((subscriber) =>
      subscriber.notify(newNotification),
    );
  }

  async subscribe(user: UserEntity) {
    this.subscribers.push(user);
  }

  async unsubscribe(user: UserEntity) {
    this.subscribers.filter((subscriber) => subscriber !== user);
  }

  private async createNotification(dto: CreateNotificationDTO<string>) {
    const notification = await this.notificationEntity.create({ ...dto });

    return notification;
  }
}
