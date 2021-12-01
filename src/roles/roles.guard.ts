import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { roles } from '../dto/role.dto';
import { RolesService } from './roles.service';

@Injectable()
export class RolesGuard implements CanActivate {
  //Todo: do refactoring in next commits
  constructor(
    private rolesService: RolesService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const roles = this.reflector.get<roles>('role', context.getHandler());

      const user = request.user;

      const hasRole = user.roles.find((role) => role.title === roles);

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
