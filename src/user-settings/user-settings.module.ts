import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AccountSettingsEntity from '../entities/account-settings.entity';
import PinEntity from '../entities/pin.entity';
import TimeLineEntity from '../entities/timeline-settings.entity';
import UserEntity from '../entities/users.entity';
import { UserSettingsController } from './user-settings.controller';
import { UserSettingsService } from './user-settings.service';

@Module({
  controllers: [UserSettingsController],
  imports: [
    TypeOrmModule.forFeature([
      AccountSettingsEntity,
      TimeLineEntity,
      PinEntity,
      UserEntity,
    ]),
  ],
  providers: [UserSettingsService],
})
export class UserSettingsModule {}
