import { JwtTokenService } from '@jwt-token/jwt-token.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RolesService } from '@roles/roles.service';
import { UsersService } from '@users/users.service';
import CreateUserDTO from 'src/dto/users.dto';
import AuthDTO, { authType } from 'src/dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtTokenService: JwtTokenService,
    private rolesService: RolesService,
  ) {}

  async registration(dto: CreateUserDTO<string>, photo: Express.Multer.File) {
    return this.validateAccount('registration', dto, photo);
  }

  async authorization(dto: AuthDTO<string>) {
    return this.validateAccount('authorization', dto);
  }

  async logout(currentToken: string): Promise<string> {
    const { token } = await this.jwtTokenService.findToken(currentToken);

    await this.jwtTokenService.deleteToken(token);

    return 'Вы вылогинились из акканута';
  }

  async deleteAccount(jwtToken: string): Promise<string> {
    const { token, user } = await this.jwtTokenService.findToken(jwtToken);

    await this.jwtTokenService.deleteToken(token);

    await this.usersService.deleteCurrentUser(user.id);

    return `Вы удалили свой аккаунт`;
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

      const currentRole = await this.rolesService.getCurrentRole(dto.role);

      const hashPasswod = await bcrypt.hashSync(dto.password, 5);

      const newUser: CreateUserDTO<string> = {
        username: dto.username,
        firstname: dto.firstname,
        lastname: dto.lastname,
        email: dto.email,
        password: hashPasswod,
        photo: photo.buffer.toString(),
        refreshToken: dto.refreshToken,
        role: currentRole.title,
      };

      const refreshToken = await this.jwtTokenService.generateToken(newUser);

      const createdUser = await this.usersService.createUser({
        ...newUser,
        refreshToken,
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
