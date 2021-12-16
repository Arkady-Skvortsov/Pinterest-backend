import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import MessageEntity from '../entities/messages.entity';
import CreateMessagesDTO from '../dto/messages.dto';
import UserEntity from 'src/entities/users.entity';
import { channel } from 'diagnostics_channel';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageEntity: Repository<MessageEntity>,
    private jwtTokenService: JwtTokenService,
  ) {}

  async getAllMessages(
    user: UserEntity,
    username: string,
  ): Promise<MessageEntity[]> {
    const messages = user.messages.map((message) => {
      if (message.author.username === username) return message; //Todo: Replace username to Ws room title
    });

    return messages;
  }

  async getCurrentMessage(
    user: UserEntity,
    username: string,
    id: number,
  ): Promise<MessageEntity> {
    const message = user.messages
      .filter((message) => {
        if (message.author.username === username && message.id === id)
          return message; //Todo: Replace username to Ws room title
      })
      .pop();

    return message;
  }

  async updateCurrentMessage(
    user: UserEntity,
    payload: any,
    username: string,
    id: number,
  ): Promise<MessageEntity> {
    const message = user.messages
      .filter((message) => {
        if (message.author.username === username && message.id === id)
          return message;
      })
      .pop();

    await this.messageEntity.update(message, payload);

    return message;
  }

  async replyCurrentMessage(channel: string, dto: CreateMessagesDTO<string>) {}

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
