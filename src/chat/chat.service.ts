import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ChatEntity from '../entities/chat.entity';
import UserEntity from '../entities/users.entity';
import CreateChatDTO from '../dto/chat.dto';
import { NotificationObserverService } from '../notification/notification.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity) private chatEntity: Repository<ChatEntity>,
    private notificationObserverService: NotificationObserverService,
  ) {}

  async getAllChats(user: UserEntity): Promise<ChatEntity[]> {
    return user.chat;
  }

  async getCurrentChat(user: UserEntity, channel: string): Promise<ChatEntity> {
    const currentChat = user.chat.find(
      (chat) =>
        chat.owner.username === user.username ||
        (chat.catcher.username === user.username &&
          chat.channelName === channel),
    );

    return currentChat;
  }

  async createChat(dto: CreateChatDTO): Promise<ChatEntity> {
    return await this.chatEntity.create(dto);
  }

  async muteCurrentChat(
    user: UserEntity,
    channel: string,
    mute: boolean,
  ): Promise<string> {
    const currentChat = await this.getCurrentChat(user, channel);
    let someNotification;

    if (mute === false) {
      currentChat.mute = true;
      someNotification = `Чат "${currentChat.channelName}" был замьючен`;
    }

    currentChat.mute = false;
    someNotification = `Вы размъютили чат "${currentChat.channelName}"`;

    await this.chatEntity.update(currentChat, { mute });

    return someNotification;
  }

  //Todo: Improve that with Observer pattern for chat and done with sensooretCurrentChat() method
  async censooretCurrentChat(
    user: UserEntity,
    channel: string,
    censooret: boolean,
  ) {
    const currentChat = await this.getCurrentChat(user, channel);

    if (censooret === false) {
      currentChat.censoret = true;
    }

    currentChat.censoret = false;

    return currentChat;
  }

  async deleteCurrentChat(user: UserEntity, channel: string): Promise<string> {
    const currentChat = await this.getCurrentChat(user, channel);

    await this.chatEntity.delete(currentChat);

    return `Чат "${currentChat.channelName}" был удален!`;
  }
}
