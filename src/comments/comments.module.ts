import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtTokenModule } from '../jwt-token/jwt-token.module';
import { PinsModule } from '../pins/pins.module';
import { UsersModule } from '../users/users.module';
import CommentEntity from '../entities/comment.entity';
import PinEntity from '../entities/pin.entity';
import UserEntity from '../entities/users.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [
    TypeOrmModule.forFeature([CommentEntity, UserEntity, PinEntity]),
    UsersModule,
    PinsModule,
    JwtTokenModule,
  ],
  exports: [CommentsService],
})
export class CommentsModule {}
