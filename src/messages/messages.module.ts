import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import MessageEntity from '../entities/messages.entity';
import UserEntity from '../entities/users.entity';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { ChatModule } from '../chat/chat.module';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
  imports: [
    TypeOrmModule.forFeature([UserEntity, MessageEntity]),
    forwardRef(() => ChatModule),
  ],
  exports: [MessagesService],
})
export class MessagesModule {}
