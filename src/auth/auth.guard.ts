import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { requestType } from '../interfaces/auth.interface';
import { JwtTokenService } from '../jwt-token/jwt-token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private jwtTokenService: JwtTokenService;

  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const refChoose: requestType = this.reflector.get<requestType>(
      'requestType',
      context.getHandler(),
    );
    let request;

    if (refChoose === 'http') request = context.switchToHttp().getRequest();

    if (refChoose === 'ws') request = context.switchToWs().getData();

    const token = request.cookies['jwt-token'];

    const validateToken = this.jwtTokenService.verifyToken(token);

    if (!validateToken) {
      throw new UnauthorizedException('Не валидный токен');
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
