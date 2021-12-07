import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from '../entities/board.entity';
import NotesEntity from '../entities/notes.entity';
import UserEntity from '../entities/users.entity';
import { RedisModule } from '../redis/redis.module';
import { BoardsService } from './boards.service';
import { BoardsResolver } from './boards.resolver';
import { JwtTokenModule } from '../jwt-token/jwt-token.module';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [BoardsService, BoardsResolver],
  imports: [
    TypeOrmModule.forFeature([BoardEntity, UserEntity, NotesEntity]),
    RedisModule,
    JwtTokenModule,
    UsersModule,
  ],
  exports: [BoardsService],
})
export class BoardsModule {}
