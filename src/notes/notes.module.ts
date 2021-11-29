import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import NotificationEntity from 'src/entities/notification.entity';
import UserEntity from 'src/entities/users.entity';
import { BoardEntity } from 'src/entities/board.entity';
import { JwtTokenModule } from '@jwt-token/jwt-token.module';

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
