import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import NotificationEntity from '../entities/notification.entity';
import UserEntity from '../entities/users.entity';
import {
  NotificationObserverService,
  NotificationService,
} from './notification.service';
import { NotificationController } from './notification.controller';
import PinEntity from '../entities/pin.entity';
import CommentEntity from '../entities/comment.entity';
import { BoardEntity } from '../entities/board.entity';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, NotificationObserverService],
  imports: [
    TypeOrmModule.forFeature([
      NotificationEntity,
      UserEntity,
      PinEntity,
      CommentEntity,
      BoardEntity,
    ]),

    UsersModule,
  ],
  exports: [NotificationService, NotificationObserverService],
})
export class NotificationModule {}
