export default abstract class IRoles<T, R, H> {
  abstract getAllRoles(): Promise<T[]>;
  abstract getCurrentRole(id: R): Promise<T>;
  abstract createNewRole(dto: H): Promise<T>;
  abstract updateCurrentRole(id: R, dto: H): Promise<T>;
  abstract deleteCurrentRole(id: R): Promise<T>;
}
