import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from 'src/entities/board.entity';
import NotesEntity from 'src/entities/notes.entity';
import UserEntity from 'src/entities/users.entity';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService],
  imports: [TypeOrmModule.forFeature([BoardEntity, UserEntity, NotesEntity])],
})
export class BoardsModule {}
