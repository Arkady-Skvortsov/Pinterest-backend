import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service';
import { JwtTokenService } from '../jwt-token/jwt-token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
    @Inject(JwtTokenService) private jwtTokenService: JwtTokenService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    console.log(request.cookies['jwt-token']);

    const token = request.token ?? request.cookies['jwt-token'];

    let currentToken;
    let currentUser;

    this.jwtTokenService
      .findToken(token)
      .then((data) => {
        currentToken = data.user;
      })
      .catch((e) => e);

    this.usersService
      .getCurrentUserByParam(currentToken)
      .then((data) => {
        currentUser = data;
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
