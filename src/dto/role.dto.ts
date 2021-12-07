export type roles = 'admin' | 'user';

export default interface CreateRoleDTO<T> {
  readonly id: number;
  readonly title: T;
  readonly description: T;
}
