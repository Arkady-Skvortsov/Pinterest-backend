import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import CreateUserDTO from '../dto/users.dto';
import AuthDTO, { authType } from '../dto/auth.dto';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import UserEntity from '../entities/users.entity';
import { RolesService } from '../roles/roles.service';
import { FileService } from '../file/file.service';

@Injectable()
export class AuthService {
  constructor(
    private fileEntity: FileService,
    private jwtTokenService: JwtTokenService,
    private usersService: UsersService,
    private rolesService: RolesService,
  ) {}

  async registration(dto: CreateUserDTO<string>, photo: Express.Multer.File) {
    return this.validateAccount('registration', dto, photo);
  }

  async authorization(dto: AuthDTO<string>): Promise<UserEntity> {
    return this.validateAccount('authorization', dto);
  }

  async logout(user: UserEntity): Promise<string> {
    await this.jwtTokenService.deleteToken(user.refreshToken);

    return `Вы (${user.username}) вылогинились из акканута`;
  }

  async deleteAccount(user: UserEntity): Promise<string> {
    await this.jwtTokenService.deleteToken(user.refreshToken);

    await this.usersService.deleteCurrentUser(user);

    return `Вы (${user.username}) удалили свой аккаунт`;
  }

  private async validateAccount(
    type: authType,
    dto: CreateUserDTO<string> | any,
    photo?: Express.Multer.File,
  ): Promise<UserEntity> {
    const currentUser = await this.usersService.getCurrentUserByParam(
      dto.username,
    );

    if (type === 'registration') {
      const profileLink = `${uuidv4() + '/' + dto.username}`;

      if (currentUser) {
        throw new HttpException(
          'Данный пользователь уже существует',
          HttpStatus.FORBIDDEN,
        );
      }

      const hashPasswod = await bcrypt.hashSync(dto.password, 5);
      const currentRole = await this.rolesService.getCurrentRole('user');

      const newUser: CreateUserDTO<string> = {
        username: dto.username,
        firstname: dto.firstname,
        lastname: dto.lastname,
        email: dto.email,
        profile_link: profileLink,
        password: hashPasswod,
        role: currentRole,
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

  private async comparePassword(
    userpassword: string,
    password: string,
  ): Promise<boolean> {
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
