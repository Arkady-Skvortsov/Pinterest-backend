export default abstract class IHistory<T, R, H> {
  abstract getAllHistory(): Promise<T[]>;
  abstract getCurrentHistory(id: R): Promise<T>;
  abstract createNewHistory(dto: H): Promise<T>;
  abstract updateCurrentHistory(id: R, dto: H): Promise<T>;
  abstract deleteCurrentHistory(id: R): Promise<R>;
}
