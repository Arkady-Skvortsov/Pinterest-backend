import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { gMedia } from '../dto/media.dto';

@Injectable()
export class MediaGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const mediaName: gMedia = this.reflector.get<gMedia>(
        'AppMedia',
        context.getHandler(),
      );

      let media;

      const user = request.user;

      if (mediaName === 'board')
        media = user.boards.find(
          (board) =>
            board.title === request.body.title && board.author === user,
        );

      if (mediaName === 'pin')
        media = user.pins.find(
          (pin) => pin.title === request.body.title && pin.author === user,
        );

      if (mediaName === 'comment')
        media = user.comments.find(
          (comment) =>
            comment.id === request.params.id && comment.author === user,
        );

      if (mediaName === 'message')
        media = user.chat
          .find((chat) => chat.author === user)
          .messages.find((message) => message.id === request.params.id);

      if (mediaName === 'chat')
        media = user.chat.find(
          (chat) => chat.owner === user ?? chat.catcher === user,
        );

      request.media = media;

      return true;
    } catch (e) {
      throw new HttpException(
        'Вы не можете менять медию которая вам не принадлежит',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
