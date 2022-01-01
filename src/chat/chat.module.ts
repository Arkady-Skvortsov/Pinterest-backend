import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import UserEntity from '../entities/users.entity';
import MessageEntity from '../entities/messages.entity';
import { MessagesModule } from '../messages/messages.module';
import { ChatController } from './chat.controller';
import ChatEntity from '../entities/chat.entity';
import { NotificationModule } from '../notification/notification.module';

@Module({
  providers: [ChatService],
  imports: [
    TypeOrmModule.forFeature([UserEntity, ChatEntity, MessageEntity]),
    NotificationModule,
    forwardRef(() => MessagesModule),
  ],
  exports: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
