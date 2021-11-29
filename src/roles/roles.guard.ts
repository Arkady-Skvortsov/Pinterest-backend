import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RolesService } from './roles.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private rolesService: RolesService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
