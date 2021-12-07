import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import CreateUserDTO from '../dto/users.dto';
import AuthDTO, { authType } from '../dto/auth.dto';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtTokenService: JwtTokenService,
    private usersService: UsersService,
  ) {}

  async registration(dto: CreateUserDTO<string>, photo: Express.Multer.File) {
    return this.validateAccount('registration', dto, photo);
  }

  async authorization(dto: AuthDTO<string>) {
    return this.validateAccount('authorization', dto);
  }

  async logout(currentToken: string): Promise<string> {
    const { token, user } = await this.jwtTokenService.findToken(currentToken);

    await this.jwtTokenService.deleteToken(token);

    return `Вы (${user.username}) вылогинились из акканута`;
  }

  async deleteAccount(jwtToken: string): Promise<string> {
    const { token, user } = await this.jwtTokenService.findToken(jwtToken);

    await this.jwtTokenService.deleteToken(token);

    await this.usersService.deleteCurrentUser(jwtToken);

    return `Вы (${user.username}) удалили свой аккаунт`;
  }

  private async validateAccount(
    type: authType,
    dto: CreateUserDTO<string> & any,
    photo?: Express.Multer.File,
  ) {
    const currentUser = await this.usersService.getCurrentUserByParam(
      dto.username,
    );

    if (type === 'registration') {
      if (currentUser) {
        throw new HttpException(
          'Данный пользователь уже существует',
          HttpStatus.FORBIDDEN,
        );
      }

      const hashPasswod = await bcrypt.hashSync(dto.password, 5);

      const newUser: CreateUserDTO<string> = {
        username: dto.username,
        firstname: dto.firstname,
        lastname: dto.lastname,
        email: dto.email,
        password: hashPasswod,
        photo: photo.buffer.toString(),
        role: dto.role,
        refreshToken: dto.refreshToken,
      };

      // const currentRole = await this.rolesService.getCurrentRole(dto.role);
      const refreshToken = await this.jwtTokenService.generateToken(newUser);

      const createdUser = await this.usersService.createUser({
        ...newUser,
        refreshToken,
        role: 'admin',
      });

      return createdUser;
    }

    if (type === 'authorization') {
      if (!currentUser) {
        throw new UnauthorizedException(
          'Данный пользователь не зарегистрирован',
        );
      }

      await this.comparePassword(currentUser.password, dto.password);

      await this.jwtTokenService.refreshToken(dto.refreshToken);

      return currentUser;
    }
  }

  private async comparePassword(userpassword: string, password: string) {
    try {
      const compare = await bcrypt.compare(userpassword, password);

      if (!compare) {
        throw new HttpException('Пароли не совпадают', HttpStatus.FORBIDDEN);
      }

      return compare;
    } catch (e) {
      throw new HttpException('Пароли не совпадают', HttpStatus.FORBIDDEN);
    }
  }
}
