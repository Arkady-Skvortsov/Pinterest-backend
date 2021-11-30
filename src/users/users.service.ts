import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscriber } from 'rxjs';
import { RolesService } from '@roles/roles.service';
import CreateUserDTO from 'src/dto/users.dto';
import UserEntity from 'src/entities/users.entity';
import { JwtTokenService } from '@jwt-token/jwt-token.service';
import banDTO from 'src/dto/ban.dto';
import { NotificationObserverService } from '@notification/notification.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
    private roleService: RolesService,
    private jwtTokenService: JwtTokenService,
    private notificationObserverService: NotificationObserverService,
  ) {}

  async getAllUsers(): Promise<UserEntity[]> {
    const users = await this.userEntity.find();

    return users;
  }

  async getCurrentUserByParam(param: string | number): Promise<UserEntity> {
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
  }

  async createUser(dto: CreateUserDTO<string>) {
    const currentRole = await this.roleService.getCurrentRole(dto.role);

    const newUser = await this.userEntity.create({ ...dto, role: currentRole });

    return newUser;
  }

  async updateCurrentUser(
    token: string,
    dto: CreateUserDTO<string>,
  ): Promise<UserEntity> {
    const currentRole = await this.roleService.getCurrentRole(dto.role);

    const { user } = await this.jwtTokenService.findToken(token);

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

  async banCurrentUser(token: string, dto: banDTO<string>): Promise<string> {
    const { user } = await this.jwtTokenService.findToken(token);
    let action;

    if (!user.isBan) {
      user.isBan = true;
      await this.userEntity.update(user.id, { ...dto }); // Todo: fix moment right here (With DTO)

      action = `Забанен по причине ${dto.dueTo}`;
    } else {
      user.isBan = false;
      await this.userEntity.update(user.id, { ...dto });

      action = `Разбанен, обвинения по причине ${dto.dueTo} сняты`;
    }

    return `Пользователь ${user.username} ${action}`;
  }

  async subscribe(token: string, author: string) {
    const { user } = await this.jwtTokenService.findToken(token);
    //Todo: Refactoring, add object with {author: subscriber} payload
    // return this.notificationObserverService.subscribe();
  }

  async unsubscribe(token: string, author: string) {
    const { user } = await this.jwtTokenService.findToken(token);

    // return this.notificationObserverService.unsubscribe();
  }
}
