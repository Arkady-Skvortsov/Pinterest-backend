import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtTokenService } from '@jwt-token/jwt-token.service';
import { Observable } from 'rxjs';
import { gMedia } from 'src/dto/media.dto';
import { Reflector } from '@nestjs/core';

@Injectable()
export class MediaGuard implements CanActivate {
  constructor(
    private jwtTokenService: JwtTokenService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const mediaName: gMedia = this.reflector.get<gMedia>(
        'AppMedia',
        context.getHandler(),
      );

      let user;
      let media;

      const token = request.token;

      this.jwtTokenService.findToken(token).then((data) => {
        user = data.user;
      });

      if (mediaName === 'board') {
        user.boards
          .filter((board) => {
            if (board.title === request.body.title && board.author === user)
              media = board;
          })
          .pop();
      }

      if (mediaName === 'pin') {
        user.pins
          .filter((pin) => {
            if (pin.title === request.body.title && pin.author === user)
              media = pin;
          })
          .pop();
      }

      request.media = media; //I would be catch all from that guard and set into my methods

      return true;
    } catch (e) {
      throw new HttpException(
        'Вы не можете менять медию которая вам не принадлежит',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
