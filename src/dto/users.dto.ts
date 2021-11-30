export type gender = 'Man' | 'Woman' | 'Custom';
export type finder = string | number;

export default interface CreateUserDTO<T> {
  readonly username: T;
  readonly firstname: T;
  readonly lastname: T;
  readonly password: T;
  readonly email: T;
  readonly photo: T;
  refreshToken?: T;
  readonly role: T;
}

export class UpdateUserDTO<T> {
  readonly useranme: T;
  readonly firstname: T;
  readonly lastname: T;
  readonly password: T;
  readonly email: T;
  readonly photo: T;
  readonly role: T;
  readonly boards: [];
  readonly pins: [];
  readonly comments: [];
}
