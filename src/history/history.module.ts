import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { JwtTokenModule } from '../jwt-token/jwt-token.module';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import HistoryEntity from '../entities/history.entity';
import PinEntity from '../entities/pin.entity';
import UserEntity from '../entities/users.entity';
import { BoardEntity } from '../entities/board.entity';
import CommentEntity from '../entities/comment.entity';

@Module({
  providers: [HistoryService],
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
  exports: [HistoryService],
})
export class HistoryModule {}
