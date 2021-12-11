export default abstract class IBoard<T, R, H> {
  abstract getAllBoards(): Promise<T[]>;
  abstract getCurrentBoard(title: R): Promise<T>;
  abstract createNewBoard(dto: H): Promise<T>;
  abstract updateCurrentBoard(title: R, dto: H): Promise<T>;
  abstract deleteCurrentBoard(title: R): Promise<R>;
}
