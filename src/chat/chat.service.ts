import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ChatEntity from '../entities/chat.entity';
import { MessagesService } from '../messages/messages.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity) private chatEntity: Repository<ChatEntity>,
    private messagesService: MessagesService,
  ) {}

  async getAllChats(channeL: string) {}

  async getCurrenChat(channel: string) {}

  async muteCurrentChat(channel: string, mute: boolean) {}

  async deleteChat(channel: string) {}
}
