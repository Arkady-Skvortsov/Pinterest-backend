export default abstract class IComments<T, R, H, C> {
  abstract getAllComments(): Promise<T[]>;
  abstract getCurrentComment(title: C, id: R): Promise<T>;
  abstract createNewComment(title: C, dto: H): Promise<T>;
  abstract updateCurrentComment(title: C, id: R, dto: H): Promise<T>;
  abstract deleteCurrentComment(title: C, id: R): Promise<R>;
}
