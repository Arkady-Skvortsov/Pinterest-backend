import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtTokenService } from './jwt-token.service';

@Injectable()
export class JwtTokenGuard implements CanActivate {
  constructor(private jwtTokenService: JwtTokenService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const firstPart = request.headers.authorization.split(' ')[0];
    const secondPart = request.headers.authorization.split(' ')[1];

    const validateToken = this.jwtTokenService.verifyToken(secondPart);

    if (firstPart !== 'Bearer' && !validateToken) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }

    request.token = secondPart;

    return true;
  }
}
