import NotificationEntity from '../entities/notification.entity';
import { RequestCustom } from './auth.interface';

export default abstract class INotification<
  T = NotificationEntity,
  R = number,
  K = RequestCustom,
> {
  abstract getNotifications(request: K): Promise<T[]>;
  abstract getCurrentNotification(request: K, id: R): Promise<T>;
  abstract deleteCurrentNotification(request: K, id: R): Promise<R>;
}
