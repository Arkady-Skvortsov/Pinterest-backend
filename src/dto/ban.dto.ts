export type banDueTo =
  | 'булинг в комментариях'
  | 'Сексуальный контент в пине'
  | 'Подозрительная активность'
  | 'Осокрбление чувств черующих'
  | ':(';

export default interface banDTO<T> {
  username: T;
  currentComment?: number; //ban under current media
  dueTo: T;
}
