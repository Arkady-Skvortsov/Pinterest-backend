import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtTokenService } from '../jwt-token/jwt-token.service';

@Injectable()
export class UsersGuard implements CanActivate {
  constructor(private jwtTokenService: JwtTokenService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const user = request.user;

      if (user.isBan) {
        throw new HttpException(
          `Вы не можете пользоваться такими функциями, потому что были забанены по причине ${user.ban_reason}`,
          HttpStatus.FORBIDDEN,
        );
      }

      return true && user; //Todo: Refactoring that moment
    } catch (e) {
      throw new HttpException(
        'Вы забанены для таких функций',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
