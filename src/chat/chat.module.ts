import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  providers: [ChatService],
  controllers: [ChatController],
  imports: [RedisModule],
})
export class ChatModule {}
