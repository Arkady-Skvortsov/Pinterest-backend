export default abstract class IComments<T, R, H> {
  abstract getAllComments(): Promise<T[]>;
  abstract getCurrentComment(id: R): Promise<T>;
  abstract createNewComment(dto: H): Promise<T>;
  abstract updateCurrentComment(id: R, dto: H): Promise<T>;
  abstract deleteCurrentComment(id: R): Promise<R>;
}
