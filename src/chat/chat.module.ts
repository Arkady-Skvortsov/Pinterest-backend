import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ChatService],
  controllers: [ChatController],
  imports: [],
})
export class ChatModule {}
