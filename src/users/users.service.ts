import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesService } from '@roles/roles.service';
import CreateUserDTO from 'src/dto/users.dto';
import UserEntity from 'src/entities/users.entity';
import { JwtTokenService } from '@jwt-token/jwt-token.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
    private roleService: RolesService,
    private jwtTokenService: JwtTokenService,
  ) {}

  async getAllUsers(): Promise<UserEntity[]> {
    try {
      const users = await this.userEntity.find();

      return users;
    } catch (e) {
      throw new HttpException(
        'Не удалось взять всех пользователей',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getCurrentUserByParam(param: string | number): Promise<UserEntity> {
    try {
      let currentUser;

      if (typeof param === 'string') {
        currentUser = await this.userEntity.findOne({
          where: { username: param },
        });
      }

      if (typeof param === 'number') {
        currentUser = await this.userEntity.findOne({ where: { id: param } });
      }

      return currentUser;
    } catch (e) {
      throw new HttpException(
        'Не удалось взять конкретного пользователя',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createUser(dto: CreateUserDTO<string>) {
    const currentRole = await this.roleService.getCurrentRole(dto.role);

    const newUser = await this.userEntity.create({ ...dto, role: currentRole });

    return newUser;
  }

  async updateCurrentUser(
    id: number,
    dto: CreateUserDTO<string>,
  ): Promise<UserEntity> {
    const currentRole = await this.roleService.getCurrentRole(dto.role);

    const { user } = await this.jwtTokenService.findToken(dto.refreshToken);

    await this.userEntity.update(user, { ...dto, role: currentRole });

    return user;
  }

  async notify(payload: any) {
    const users = await this.getAllUsers();

    users.forEach(async (user) => {
      await this.userEntity.update(user, payload);
    });
  }

  async deleteCurrentUser(id: number): Promise<number> {
    const currentUser = await this.getCurrentUserByParam(id);

    await this.userEntity.delete(currentUser);

    return currentUser.id;
  }
}
