export type banDueTo =
  | 'булинг в комментариях'
  | 'Сексуальный контент в пине'
  | 'Подозрительная активность'
  | 'Осокрбление чувств черующих'
  | ':(';

export default interface banDTO<T> {
  username: T;
  currentMedia?: number; //ban under current media (Comment, Pin, Board)
  dueTo: T;
  time: T;
}
