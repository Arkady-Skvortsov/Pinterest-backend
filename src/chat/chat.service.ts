import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ChatEntity from '../entities/chat.entity';
import UserEntity from '../entities/users.entity';
import { MessagesService } from '../messages/messages.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity) private chatEntity: Repository<ChatEntity>,
    private messagesService: MessagesService,
  ) {}

  async getAllChats(user: UserEntity) {}

  async getCurrentChat(user: UserEntity, chat: string) {}

  async muteCurrentChat(user: UserEntity, channel: string, mute: boolean) {
    if (!mute) {
    }
  }

  async censooretCurrentChat(
    user: UserEntity,
    channel: string,
    censooret: boolean,
  ) {}

  async deleteCurrentChat(user: UserEntity, channel: string) {}
}
