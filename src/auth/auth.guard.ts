import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtTokenService } from '../jwt-token/jwt-token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private jwtTokenService: JwtTokenService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.cookies['jwt-token'];

    const validateToken = this.jwtTokenService.verifyToken(token);

    if (!validateToken) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }

    let currentUser;

    this.jwtTokenService
      .findToken(token)
      .then((data) => {
        currentUser = data.user;
      })
      .catch((e) => e);

    if (!currentUser)
      throw new HttpException(
        'Такого пользователя не существует',
        HttpStatus.FORBIDDEN,
      );

    request.user = currentUser;

    return true;
  }
}
