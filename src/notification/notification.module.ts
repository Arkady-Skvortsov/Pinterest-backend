import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtTokenModule } from '../jwt-token/jwt-token.module';
import NotificationEntity from '../entities/notification.entity';
import UserEntity from '../entities/users.entity';
import {
  NotificationObserverService,
  NotificationService,
} from './notification.service';
import { NotificationController } from './notification.controller';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import PinEntity from '../entities/pin.entity';
import CommentEntity from '../entities/comment.entity';
import { BoardEntity } from '../entities/board.entity';

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
    JwtTokenModule,
  ],
  exports: [NotificationService, NotificationObserverService],
})
export class NotificationModule {}
