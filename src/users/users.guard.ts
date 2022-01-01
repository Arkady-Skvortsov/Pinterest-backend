import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UsersGuard implements CanActivate {
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

      request.notBannedUser = user;

      return true;
    } catch (e) {
      throw new HttpException(
        `Вы забанены и не можете пользоваться таким функционалом`,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
