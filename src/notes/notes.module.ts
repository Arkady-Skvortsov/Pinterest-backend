import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import NotificationEntity from '../entities/notification.entity';
import UserEntity from '../entities/users.entity';
import { BoardEntity } from '../entities/board.entity';
import { JwtTokenModule } from '../jwt-token/jwt-token.module';

@Module({
  providers: [NotesService],
  controllers: [NotesController],
  imports: [
    TypeOrmModule.forFeature([NotificationEntity, UserEntity, BoardEntity]),
    JwtTokenModule,
  ],
  exports: [NotesService],
})
export class NotesModule {}
