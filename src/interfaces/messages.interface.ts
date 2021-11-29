export default abstract class IMessages<T, R> {
  abstract getAllMessages(): Promise<T[]>;
  abstract getCurrentMessage(): Promise<T>;
  abstract createNewMessage(): Promise<T>;
  abstract updateCurrentMessage(): Promise<T>;
  abstract deleteCurrentMessage(id: R): Promise<R>;
}
