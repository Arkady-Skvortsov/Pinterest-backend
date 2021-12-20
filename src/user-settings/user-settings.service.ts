import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import AccountSettingsEntity from '../entities/account-settings.entity';
import UpdateSettingsDTO from '../dto/user-settings.dto';
import UserEntity from '../entities/users.entity';

@Injectable()
export class UserSettingsService {
  constructor(
    @InjectRepository(AccountSettingsEntity)
    private accountSettings: Repository<AccountSettingsEntity>,
  ) {}

  async getAllSettings(user: UserEntity): Promise<AccountSettingsEntity> {
    return user.user_settings;
  }

  async getCurrentSettings(user: UserEntity, title: string) {
    const currentSettings = await this.accountSettings.find({
      where: { user },
    });
  }

  async updateCurrentSettings(
    user: UserEntity,
    title: string,
    dto: UpdateSettingsDTO<boolean, string>,
  ) {
    dto;
  }

  async deleteCurrentSettings(user: UserEntity, title: string) {}
}
