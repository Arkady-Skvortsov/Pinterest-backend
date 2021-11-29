export type banDueTo = '' | '' | '' | '' | '';

export default interface banDTO<T> {
  username: T;
  mediaPoint: T; //ban under current media
  dueTo: T;
}
