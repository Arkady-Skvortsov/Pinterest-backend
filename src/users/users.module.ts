import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import UserEntity from '../entities/users.entity';
import PinEntity from '../entities/pin.entity';
import RoleEntity from '../entities/roles.entity';
import CommentEntity from '../entities/comment.entity';
import { BoardEntity } from '../entities/board.entity';
import HistoryEntity from '../entities/history.entity';
import AccountSettingsEntity from '../entities/account-settings.entity';
import NotificationEntity from '../entities/notification.entity';
import { FileEntity } from '../entities/file.entity';
import ChatEntity from '../entities/chat.entity';
import { UserSettingsModule } from '../user-settings/user-settings.module';
import { JwtTokenModule } from '../jwt-token/jwt-token.module';

@Module({
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      PinEntity,
      RoleEntity,
      ChatEntity,
      CommentEntity,
      FileEntity,
      BoardEntity,
      HistoryEntity,
      AccountSettingsEntity,
      NotificationEntity,
    ]),

    forwardRef(() => UserSettingsModule),
    JwtTokenModule,
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
