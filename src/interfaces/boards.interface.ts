import CreateBoardDTO from '../dto/board.dto';
import { BoardEntity } from '../entities/board.entity';
import { RequestCustom } from './auth.interface';

export default abstract class IBoard<
  T = BoardEntity,
  R = string,
  H = CreateBoardDTO<string>,
  K = RequestCustom,
> {
  abstract getAllBoards(): Promise<T[]>;
  abstract getCurrentBoard(request: K, title: R): Promise<T>;
  abstract createNewBoard(request: K, dto: H): Promise<T>;
  abstract addCurrentBoard(request: K, title: R, choose: R): Promise<T>;
  abstract changeVisibility(request: K, title: R): Promise<T>;
  abstract updateCurrentBoard(request: K, title: R, dto: H): Promise<T>;
  abstract deleteCurrentBoard(request: K, title: R): Promise<R>;
}
