import banDTO from '../dto/ban.dto';
import CreateUserDTO from '../dto/users.dto';
import UserEntity from '../entities/users.entity';
import { RequestCustom } from './auth.interface';

export default abstract class IUsers<
  T = UserEntity,
  R = string,
  H = CreateUserDTO<string>,
  K = RequestCustom,
> {
  abstract getAllUsers(): Promise<T[]>;
  abstract updateCurrentUser(
    request: K,
    dto: H,
    photo: Express.Multer.File,
  ): Promise<T>;
  abstract banCurrentUser(
    request: K,
    title: R,
    dto: banDTO<string>,
  ): Promise<R>;
  abstract subscribe(request: K, username: R): Promise<R>;
  abstract unsubscribe(request: K, username: R): Promise<R>;
}
