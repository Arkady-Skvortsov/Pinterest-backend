import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtTokenModule } from '../jwt-token/jwt-token.module';
import { NotificationModule } from '../notification/notification.module';
import { PinsModule } from '../pins/pins.module';
import { UsersModule } from '../users/users.module';
import { MediaModule } from '../media/media.module';
import { HistoryModule } from '../history/history.module';
import CommentEntity from '../entities/comment.entity';
import PinEntity from '../entities/pin.entity';
import UserEntity from '../entities/users.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, CommentsResolver],
  imports: [
    TypeOrmModule.forFeature([CommentEntity, UserEntity, PinEntity]),
    UsersModule,
    PinsModule,
    JwtTokenModule,
    MediaModule,
    HistoryModule,
    NotificationModule,
  ],
  exports: [CommentsService],
})
export class CommentsModule {}
