import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import MessageEntity from '../entities/messages.entity';
import UserEntity from '../entities/users.entity';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
  imports: [TypeOrmModule.forFeature([UserEntity, MessageEntity])],
  exports: [MessagesService],
})
export class MessagesModule {}
