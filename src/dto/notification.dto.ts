export type event =
  | 'Лайк'
  | 'Подписка'
  | 'Ответ на комментарий'
  | 'Сохранение пина'
  | 'Вы были забанены, азазаза :)'
  | 'Автор выложил новый пин'
  | 'Автор выложил новую доску'
  | 'Автор добавил вас в доску';

export type subscribe = { author: { subscribers: [] } };

export default interface CreateNotificationDTO<T> {
  text: T;
  event: event;
  user: T;
  author: T;
}
