export type authType = 'registration' | 'authorization';

export default interface AuthDTO<T = string> {
  username: T;
  password: T;
  refreshToken?: T;
}
