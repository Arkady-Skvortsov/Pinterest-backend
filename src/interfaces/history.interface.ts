import CreateHistoryDTO from '../dto/history.dto';
import HistoryEntity from '../entities/history.entity';
import { RequestCustom } from './auth.interface';

export default abstract class IHistory<
  T = HistoryEntity,
  R = number,
  H = CreateHistoryDTO,
  K = RequestCustom,
> {
  abstract getAllHistory(request: K): Promise<T[]>;
  abstract getCurrentHistory(request: K, id: R): Promise<T>;
  abstract createNewHistory(request: K, dto: H): Promise<T>;
  abstract updateCurrentHistory(request: K, id: R, dto: H): Promise<T>;
  abstract deleteCurrentHistory(request: K, id: R): Promise<R>;
}
