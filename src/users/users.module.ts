import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from 'src/entities/users.entity';
import PinEntity from 'src/entities/pin.entity';
import RoleEntity from 'src/entities/roles.entity';
import CommentEntity from 'src/entities/comment.entity';
import { BoardEntity } from 'src/entities/board.entity';
import HistoryEntity from 'src/entities/history.entity';
import AccountSettingsEntity from 'src/entities/account-settings.entity';
import NotificationEntity from 'src/entities/notification.entity';
import { RolesModule } from '@roles/roles.module';
import { JwtTokenModule } from '@jwt-token/jwt-token.module';

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

    RolesModule,
    JwtTokenModule,
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
