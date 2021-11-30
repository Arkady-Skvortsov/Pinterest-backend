export type event =
  | 'Лайк'
  | 'Подписка'
  | 'Ответ на комментарий'
  | 'Сохранение пина'
  | 'Бан'
  | 'Автор выложил новый пин'
  | 'Автор выложил новую доску'
  | 'Автор добавил вас в доску';

// export type subscribe = { author: subscriber };

export default interface CreateNotificationDTO<T> {
  text: T;
  event: event;
  user: T;
  author: T;
}
