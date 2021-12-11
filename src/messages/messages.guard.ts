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
  constructor(private messagesService: MessagesService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const body = request.body;
      const author = request.user;

      let owner;

      this.messagesService
        .getCurrentMessage(author, body.username, body.id)
        .then((payload) => {
          if (payload.author === author) {
            owner = author;
          }
        });

      if (!owner)
        throw new HttpException(
          'Вы не можете изменить сообщение, которое вам не принадлежит',
          HttpStatus.FORBIDDEN,
        );

      return true;
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Вы не можете изменить сообщение, которое вам не принадлежит',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
