import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { roles } from '../dto/role.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const user = request.user;

      const hasRole = user.roles.find((role) => role.title === 'admin');

      if (!hasRole) {
        throw new HttpException(
          'У вас нет доступа к контенту',
          HttpStatus.FORBIDDEN,
        );
      }

      return true;
    } catch (e) {
      throw new HttpException(
        'У вас нет доступа к контенту',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
