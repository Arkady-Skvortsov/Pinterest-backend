export default abstract class IChat<T, R extends string> {
  abstract getAllChats(): Promise<T[]>;
  abstract getCurrentChat(): Promise<T>;
  abstract deleteCurrentChat(channel: R): Promise<R>;
}
