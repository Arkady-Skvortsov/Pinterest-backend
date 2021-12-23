import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import AccountSettingsEntity from '../entities/account-settings.entity';
import PinEntity from '../entities/pin.entity';
import UserEntity from '../entities/users.entity';
import { UserSettingsController } from './user-settings.controller';
import { UserSettingsService } from './user-settings.service';

@Module({
  controllers: [UserSettingsController],
  imports: [
    TypeOrmModule.forFeature([AccountSettingsEntity, PinEntity, UserEntity]),
    forwardRef(() => UsersModule),
  ],
  providers: [UserSettingsService],
  exports: [UserSettingsService],
})
export class UserSettingsModule {}
