import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import UserEntity from '../entities/users.entity';
import MessageEntity from '../entities/messages.entity';
import { MessagesModule } from '../messages/messages.module';
import ChatEntity from '../entities/chat.entity';

@Module({
  providers: [ChatService],
  imports: [
    TypeOrmModule.forFeature([UserEntity, MessageEntity, ChatEntity]),
    forwardRef(() => MessagesModule),
  ],
  exports: [ChatService],
})
export class ChatModule {}
