import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import NotificationEntity from 'src/entities/notification.entity';
import UserEntity from 'src/entities/users.entity';

@Module({
  providers: [NotesService],
  controllers: [NotesController],
  imports: [TypeOrmModule.forFeature([NotificationEntity, UserEntity])],
})
export class NotesModule {}
