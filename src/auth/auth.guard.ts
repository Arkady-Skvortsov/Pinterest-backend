import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtTokenService } from '../jwt-token/jwt-token.service';

@Injectable() //Todo: Fix problems with send and get user payload from guard
export class AuthGuard implements CanActivate {
  constructor(private jwtTokenService: JwtTokenService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    console.log(request.cookies['jwt-token']);

    const token = request.token ?? request.cookies['jwt-token'];

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
