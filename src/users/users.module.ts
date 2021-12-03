import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from '../entities/users.entity';
import PinEntity from '../entities/pin.entity';
import RoleEntity from '../entities/roles.entity';
import CommentEntity from '../entities/comment.entity';
import { BoardEntity } from '../entities/board.entity';
import HistoryEntity from '../entities/history.entity';
import AccountSettingsEntity from '../entities/account-settings.entity';
import NotificationEntity from '../entities/notification.entity';
import { JwtTokenModule } from '../jwt-token/jwt-token.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      PinEntity,
      RoleEntity,
      CommentEntity,
      BoardEntity,
      HistoryEntity,
      AccountSettingsEntity,
      NotificationEntity,
    ]),

    JwtTokenModule,
    NotificationModule,
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
