export type event =
  | 'Лайк комментария'
  | 'Подписка'
  | 'Ответ на комментарий'
  | 'Сохранение доски'
  | 'Сохранение пина'
  | 'Лайк пина'
  | 'Лайк доски'
  | 'Комментарий под пином'
  | 'Вы были забанены, азазаза :)'
  | 'Автор выложил новый пин'
  | 'Автор выложил новую доску'
  | 'Автор добавил вас в доску';

export type subscriber<T> = { author: T; subscribers: T[] };

export default interface CreateNotificationDTO<T> {
  text: T;
  event: event;
  user: T;
  author: T;
}
