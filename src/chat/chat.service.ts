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

  async getAllChats(user: UserEntity): Promise<ChatEntity[]> {
    return user.chat;
  }

  async getCurrentChat(user: UserEntity, channel: string): Promise<ChatEntity> {
    const currentChat = user.chat
      .filter(
        (chat) =>
          chat.owner.username === user.username ||
          (chat.catcher.username === user.username &&
            chat.channelName === channel),
      )
      .pop();

    return currentChat;
  }

  async muteCurrentChat(
    user: UserEntity,
    channel: string,
    mute: boolean,
  ): Promise<string> {
    const currentChat = await this.getCurrentChat(user, channel);
    let someNotification;

    if (!mute) {
      currentChat.mute = mute;
      someNotification = `Чат ${currentChat.channelName} был замьючен`;
    }

    currentChat.mute = mute;
    someNotification = `Вы размъютили чат ${currentChat.channelName}`;

    await this.chatEntity.update(currentChat, { mute });

    return someNotification;
  }

  async censooretCurrentChat(
    user: UserEntity,
    channel: string,
    censooret: boolean,
  ) {}

  async deleteCurrentChat(user: UserEntity, channel: string): Promise<string> {
    const currentChat = await this.getCurrentChat(user, channel);

    await this.chatEntity.delete(currentChat);

    return `Чат ${currentChat.channelName} был удален!)))`;
  }
}
