export default abstract class IMessages<T, R> {
  abstract getAllMessages(channel: string): Promise<T[]>;
  abstract getCurrentMessage(channel: string, id: number): Promise<T>;
  abstract createNewMessage(channel: string, dto): Promise<T>;
  abstract updateCurrentMessage(channel: string, dto): Promise<T>;
  abstract deleteCurrentMessage(channeL: string, id: R): Promise<R>;
}
