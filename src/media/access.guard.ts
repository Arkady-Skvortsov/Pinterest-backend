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
export class AccessGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const mediaType: gMedia = this.reflector.get<gMedia>(
      'typeMedia',
      context.getHandler(),
    );

    const media = request.currentMedia;
    const user = request.user;

    if (
      (mediaType === 'board' && media.private === true) ||
      !media.collaborator.contains(user)
    ) {
      throw new HttpException(
        `Доска "${media.title}" приватная, либо же вы не являетесь участников доски, вы не можете получить к ней доступ`,
        HttpStatus.FORBIDDEN,
      );
    }

    if (mediaType === 'pin' && media.private === true) {
      throw new HttpException(
        `Пин "${media.title}" приватный`,
        HttpStatus.FORBIDDEN,
      );
    }

    request.currentMedia = media;

    return true;
  }
}
