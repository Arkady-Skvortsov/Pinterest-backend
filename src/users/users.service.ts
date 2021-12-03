import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateUserDTO from '../dto/users.dto';
import UserEntity from '../entities/users.entity';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import banDTO from '../dto/ban.dto';
import { NotificationObserverService } from '../notification/notification.service';
import { subscriber } from '../dto/notification.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
    @Inject(JwtTokenService) private jwtTokenService: JwtTokenService,
    @Inject(NotificationObserverService)
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
    const newUser = await this.userEntity.create({ ...dto });

    return newUser;
  }

  async updateCurrentUser(
    token: string,
    dto: CreateUserDTO<string>,
  ): Promise<UserEntity> {
    const { user } = await this.jwtTokenService.findToken(token);

    await this.userEntity.update(user, { ...dto });

    return user;
  }

  async notify(payload: any) {
    const users = await this.getAllUsers();

    users.forEach(async (user) => {
      await this.userEntity.update(user, payload);
    });
  }

  async deleteCurrentUser(token: string): Promise<number> {
    const { user } = await this.jwtTokenService.findToken(token);

    await this.userEntity.delete(user);

    return user.id;
  }

  async banCurrentUser(token: string, dto: banDTO<string>): Promise<string> {
    const { user } = await this.jwtTokenService.findToken(token);
    let action;

    if (!user.isBan) {
      user.isBan = true;
      await this.userEntity.update(user.id, { ...dto }); // Todo: fix moment right here (With DTO)

      action = `забанен по причине ${dto.dueTo}`;
    } else {
      user.isBan = false;
      await this.userEntity.update(user.id, { ...dto });

      action = `разбанен, обвинения по причине ${dto.dueTo} сняты`;
    }

    return `Пользователь ${user.username} ${action}`;
  }

  async subscribe(token: string, name: string) {
    const { user } = await this.jwtTokenService.findToken(token);
    const author = await this.getCurrentUserByParam(name);

    const subscriber: subscriber<UserEntity> = {
      author: author,
      subscribers: [user],
    };

    return this.notificationObserverService.subscribe(subscriber);
  }

  async unsubscribe(token: string, username: string) {
    const { user } = await this.jwtTokenService.findToken(token);
    const author = await this.getCurrentUserByParam(username);

    const subscriber: subscriber<UserEntity> = {
      author: author,
      subscribers: [user],
    };

    return this.notificationObserverService.unsubscribe(subscriber);
  }
}
