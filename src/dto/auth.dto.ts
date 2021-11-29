export type authType = 'registration' | 'authorization';

export default interface AuthDTO<T> {
  username: T;
  password: T;
  refreshToken?: T;
}
