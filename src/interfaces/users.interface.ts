export default abstract class IUsers<T, R, H> {
  abstract getAllUsers(): Promise<T[]>;
  abstract getCurrentUser(id: R): Promise<T>;
  abstract createNewUser(dto: H): Promise<T>;
  abstract updateCurrentUser(id: R, dto: H): Promise<T>;
  abstract deleteCurrentUser(id: R): Promise<R>;
}
