import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryMementoService } from './history.service';
import { HistoryController } from './history.controller';
import HistoryEntity from '../entities/history.entity';
import PinEntity from '../entities/pin.entity';
import UserEntity from '../entities/users.entity';
import { BoardEntity } from '../entities/board.entity';
import CommentEntity from '../entities/comment.entity';

@Module({
  providers: [HistoryMementoService],
  controllers: [HistoryController],
  imports: [
    TypeOrmModule.forFeature([
      HistoryEntity,
      PinEntity,
      UserEntity,
      BoardEntity,
      CommentEntity,
    ]),
  ],
  exports: [HistoryMementoService],
})
export class HistoryModule {}
