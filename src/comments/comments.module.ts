import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CommentEntity from 'src/entities/comment.entity';
import PinEntity from 'src/entities/pin.entity';
import UserEntity from 'src/entities/users.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [TypeOrmModule.forFeature([CommentEntity, UserEntity, PinEntity])],
})
export class CommentsModule {}
