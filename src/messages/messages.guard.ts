import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { MessagesService } from './messages.service';

@Injectable()
export class MessagesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      let currentMessage;

      const author = request.user;
      const chat = request.chat;

      const message = chat.messages.find(
        (message) => message.author === author,
      );

      if (!message.author)
        throw new HttpException(
          `Вы не можете изменить/удалить сообщение, которое вам не принадлежит`,
          HttpStatus.FORBIDDEN,
        );

      request.message = currentMessage;

      return true;
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Вы не можете изменить/удалить сообщение, которое вам не принадлежит',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
