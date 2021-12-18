import { Request, Response } from 'express';
import UserEntity from '../entities/users.entity';
import CreateUserDTO from '../dto/users.dto';
import MessageEntity from '../entities/messages.entity';
import ChatEntity from '../entities/chat.entity';
import PinEntity from '../entities/pin.entity';
import { BoardEntity } from '../entities/board.entity';

export interface RequestCustom extends Request {
  user: UserEntity;
  message: MessageEntity;
  chat: ChatEntity;
  media: PinEntity | BoardEntity;
}

export abstract class IAuth<T = UserEntity, R = string, C = Request> {
  abstract registration(
    res: Response,
    dto: CreateUserDTO<string>,
    photo: Express.Multer.File,
  ): Promise<T>;
  abstract authorization(request: C): Promise<T>;
  abstract logout(request: C): Promise<R>;
  abstract deleteAccount(request: C): Promise<R>;
}
