export default abstract class IBoard<T, R, H> {
  abstract getAllBoards(): Promise<T[]>;
  abstract getCurrentBoard(id: R): Promise<T>;
  abstract createNewBoard(dto: H): Promise<T>;
  abstract updateCurrentBoard(id: R, dto: H): Promise<T>;
  abstract deleteCurrentBoard(id: R): Promise<R>;
}
