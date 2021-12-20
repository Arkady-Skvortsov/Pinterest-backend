import CreateMessagesDTO from '../dto/messages.dto';
import MessageEntity from '../entities/messages.entity';
import { RequestCustom } from './auth.interface';

export default abstract class IMessages<
  T = MessageEntity,
  R = number,
  C = CreateMessagesDTO,
  K = RequestCustom,
  D = string,
> {
  abstract getAllMessages(request: K, channel: D): Promise<T[]>;
  abstract getCurrentMessage(request: K, channel: D, id: R): Promise<T>;
  abstract createNewMessage(request: K, channel: D, dto: C): Promise<T>;
  //abstract updateCurrentMessage(request: K, dto: C, id: R): Promise<T>;
  abstract deleteCurrentMessage(request: K, channeL: D, id: R): Promise<R>;
}
