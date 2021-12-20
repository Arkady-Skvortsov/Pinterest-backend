import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtTokenModule } from '../jwt-token/jwt-token.module';
import AccountSettingsEntity from '../entities/account-settings.entity';
import PinEntity from '../entities/pin.entity';
import UserEntity from '../entities/users.entity';
import { UserSettingsController } from './user-settings.controller';
import { UserSettingsService } from './user-settings.service';

@Module({
  controllers: [UserSettingsController],
  imports: [
    TypeOrmModule.forFeature([AccountSettingsEntity, PinEntity, UserEntity]),
    JwtTokenModule,
  ],
  providers: [UserSettingsService],
})
export class UserSettingsModule {}
