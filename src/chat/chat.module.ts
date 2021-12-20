import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import UserEntity from '../entities/users.entity';
import MessageEntity from '../entities/messages.entity';
import { MessagesModule } from '../messages/messages.module';
import { ChatController } from './chat.controller';
import ChatEntity from '../entities/chat.entity';
import { NotificationObserverService } from '../notification/notification.service';

@Module({
  providers: [ChatService],
  imports: [
    TypeOrmModule.forFeature([UserEntity, MessageEntity, ChatEntity]),
    forwardRef(() => MessagesModule),
  ],
  exports: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
