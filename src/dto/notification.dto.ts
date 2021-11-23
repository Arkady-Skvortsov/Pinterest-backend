export type event =
  | 'Лайк'
  | 'Подписка'
  | 'Ответ на комментарий'
  | 'Сохранение пина';

export default interface CreateNotificationDTO<T> {
  text: T;
  event: event;
  user?: T;
  author?: T;
}
