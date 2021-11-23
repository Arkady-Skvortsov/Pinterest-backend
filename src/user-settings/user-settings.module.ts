import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AccountSettingsEntity from 'src/entities/account-settings.entity';
import PinEntity from 'src/entities/pin.entity';
import TimeLineEntity from 'src/entities/timeline-settings.entity';
import UserEntity from 'src/entities/users.entity';
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
