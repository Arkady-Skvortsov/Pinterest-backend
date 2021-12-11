import { Request, Response } from 'express';
import UserEntity from '../entities/users.entity';
import AuthDTO from '../dto/auth.dto';
import CreateUserDTO from '../dto/users.dto';

export abstract class IAuth<T = UserEntity, R = string, C = Request> {
  abstract registration(
    res: Response,
    dto: CreateUserDTO<string>,
    photo: Express.Multer.File,
  );
  abstract authorization(dto: AuthDTO<string>): Promise<T>;
  abstract logout(request: C): Promise<R>;
  abstract deleteAccount(request: C): Promise<R>;
}
