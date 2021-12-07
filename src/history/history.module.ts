import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { JwtTokenModule } from '../jwt-token/jwt-token.module';
import {
  HistoryMementoService,
  Caretaker,
  Originator,
  HistoryService,
} from './history.service';
import { HistoryController } from './history.controller';
import HistoryEntity from '../entities/history.entity';
import PinEntity from '../entities/pin.entity';
import UserEntity from '../entities/users.entity';
import { BoardEntity } from '../entities/board.entity';
import CommentEntity from '../entities/comment.entity';

@Module({
  providers: [HistoryMementoService, HistoryService, Originator, Caretaker],
  controllers: [HistoryController],
  imports: [
    TypeOrmModule.forFeature([
      HistoryEntity,
      PinEntity,
      UserEntity,
      BoardEntity,
      CommentEntity,
    ]),

    JwtTokenModule,
    UsersModule,
  ],
  exports: [HistoryService, Originator, Caretaker, HistoryMementoService],
})
export class HistoryModule {}
