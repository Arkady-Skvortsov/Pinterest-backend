import ChatEntity from '../entities/chat.entity';
import { RequestCustom } from './auth.interface';

export default abstract class IChat<
  T = ChatEntity,
  R = string,
  K = RequestCustom,
> {
  abstract getAllChats(request: K): Promise<T[]>;
  abstract getCurrentChat(request: K, channel: R): Promise<T>;
  abstract deleteCurrentChat(request: K, channel: R): Promise<R>;
}
