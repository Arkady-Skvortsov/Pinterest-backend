import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateUserDTO from '../dto/users.dto';
import UserEntity from '../entities/users.entity';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import banDTO from '../dto/ban.dto';
import { NotificationObserverService } from '../notification/notification.service';
import CreateNotificationDTO, { subscriber } from '../dto/notification.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
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

    await this.userEntity.save(newUser);

    return newUser;
  }

  async updateCurrentUser(
    user: UserEntity,
    dto: CreateUserDTO<string>,
  ): Promise<UserEntity> {
    await this.userEntity.update(user, { ...dto });

    return user;
  }

  async notify(
    payload: subscriber<UserEntity>,
    dto: CreateNotificationDTO<string>,
  ) {
    const pay = payload;
    const users = payload.subscribers;

    users.forEach(async (user) => {
      await this.userEntity.update(user, {
        //notifications: [{ ...dto, author: dto.user }],
      }); //Todo: do it later
    });
  }

  async deleteCurrentUser(user: UserEntity): Promise<number> {
    await this.userEntity.delete(user);

    return user.id;
  }

  async banCurrentUser(
    user: UserEntity,
    title: string,
    dto: banDTO<string>,
  ): Promise<string> {
    let action;

    if (!user.isBan) {
      user.isBan = true;

      await this.userEntity.update(user.id, { ...dto });

      action = `забанен по причине ${dto.dueTo}`;
    } else {
      user.isBan = false;
      await this.userEntity.update(user.id, { ...dto });

      action = `разбанен, обвинения по причине ${dto.dueTo} сняты`;
    }

    return `Пользователь ${user.username} ${action}`;
  }

  async subscribe(user: UserEntity, name: string) {
    const author = await this.getCurrentUserByParam(name);

    const subscriber: subscriber<UserEntity> = {
      author: author,
      subscribers: [user],
    };

    return this.notificationObserverService.subscribe(subscriber);
  }

  async unsubscribe(user: UserEntity, username: string) {
    const author = await this.getCurrentUserByParam(username);

    const subscriber: subscriber<UserEntity> = {
      author: author,
      subscribers: [user],
    };

    return this.notificationObserverService.unsubscribe(subscriber);
  }
}
