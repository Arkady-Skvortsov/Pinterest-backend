import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import UserEntity from '../entities/users.entity';

@Module({
  providers: [ChatService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [ChatService],
})
export class ChatModule {}
