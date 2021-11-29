export default abstract class IUsersSettings<T> {
  abstract getAllSettings(): Promise<T[]>;
  abstract getCurrentSettings(): Promise<T>;
  abstract updateCurrentSettings(): Promise<T>;
  abstract createNewSettings(): Promise<T>;
  abstract deleteCurrentSettings(): Promise<T>;
}
