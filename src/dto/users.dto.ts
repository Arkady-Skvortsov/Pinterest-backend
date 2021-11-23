import { BoardEntity } from '../entities/board.entity';
import PinEntity from '../entities/pin.entity';
import RoleEntity from '../entities/roles.entity';

export type gender = 'Man' | 'Woman' | 'Custom';
export type finder = string | number;

export default interface CreateUserDTO<T> {
  readonly username: T;
  readonly firstname: T;
  readonly lastname: T;
  readonly password: T;
  readonly email: T;
  readonly photo: Express.Multer.File;
  refreshToken?: T;
  readonly role: RoleEntity;
  readonly boards?: BoardEntity[];
}

export default interface UserDTO<T> {
  readonly username: T;
  readonly firstname: T;
  readonly lastname: T;
  readonly email: T;
  //readonly photo?: Express.Multer.File;
  readonly password: T;
  // readonly refreshToken: T;
  readonly role: RoleEntity;
  //readonly pins?: PinEntity[];
  //readonly boards?: BoardEntity[];
}
