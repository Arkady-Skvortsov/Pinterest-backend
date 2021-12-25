import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import MessageEntity from '../entities/messages.entity';
import CreateMessagesDTO from '../dto/messages.dto';
import UserEntity from '../entities/users.entity';
import { ChatService } from '../chat/chat.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageEntity: Repository<MessageEntity>,
    private chatService: ChatService,
  ) {}

  async getAllMessages(user: UserEntity, channel: string) {
    // Promise<MessageEntity[]>
    const currentChat = await this.chatService.getCurrentChat(user, channel);

    return currentChat;
  }

  async getCurrentMessage(user: UserEntity, channel: string, id: number) {
    // Promise<MessageEntity>
    const currentChat = await this.chatService.getCurrentChat(user, channel);

    // const currentMessage = currentChat.messages.find(
    //   (message) => message.id === id,
    // );

    return currentChat;
  }

  async updateCurrentMessage(
    message: MessageEntity,
    payload: CreateMessagesDTO,
  ): Promise<MessageEntity> {
    await this.messageEntity.update(message, payload);

    return message;
  }

  async createNewMessage(dto: CreateMessagesDTO): Promise<MessageEntity> {
    const newMessage = await this.messageEntity.create(dto);

    await this.messageEntity.save(newMessage);

    return newMessage;
  }

  async replyCurrentMessage(
    user: UserEntity,
    channel: string,
    id: number,
    dto: CreateMessagesDTO,
  ): Promise<MessageEntity> {
    const currentMessage = await this.getCurrentMessage(user, channel, id);

    const newMessage = await this.createNewMessage(dto);

    await this.messageEntity.update(currentMessage, {
      replies: [newMessage],
    });

    return newMessage;
  }

  async deleteCurrentMessage(
    user: UserEntity,
    channel: string,
    id: number,
  ): Promise<number> {
    const currentMessage = await this.getCurrentMessage(user, channel, id);

    await this.messageEntity.delete(currentMessage);

    return currentMessage.id;
  }
}
