import ChatEntity from '../entities/chat.entity';
import { RequestCustom } from './auth.interface';

export default abstract class IChat<
  T = ChatEntity,
  R = string,
  K = RequestCustom,
  B = boolean,
> {
  abstract getAllChats(request: K): Promise<T[]>;
  abstract getCurrentChat(request: K, channel: R): Promise<T>;
  abstract censooretCurrentChat(
    request: K,
    channel: R,
    censooret: B,
  ): Promise<T>;
  abstract muteCurrentChat(request: K, channel: R, mute: B): Promise<R>;
  abstract deleteCurrentChat(request: K, channel: R): Promise<R>;
}
