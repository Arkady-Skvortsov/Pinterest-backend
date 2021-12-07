import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import MessageEntity from '../entities/messages.entity';
import CreateMessagesDTO from '../dto/messages.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageEntity: Repository<MessageEntity>,
    private jwtTokenService: JwtTokenService,
  ) {}

  async getAllMessages(
    token: string,
    username: string,
  ): Promise<MessageEntity[]> {
    const { user } = await this.jwtTokenService.findToken(token);

    const messages = user.messages.map((message) => {
      if (message.author.username === username) return message; //Todo: Replace username to Ws room title
    });

    return messages;
  }

  async getCurrentMessage(
    token: string,
    username: string,
    id: number,
  ): Promise<MessageEntity> {
    const { user } = await this.jwtTokenService.findToken(token);

    const message = user.messages
      .filter((message) => {
        if (message.author.username === username && message.id === id)
          return message; //Todo: Replace username to Ws room title
      })
      .pop();

    return message;
  }

  async updateCurrentMessage(
    token: string,
    payload: any,
    username: string,
    id: number,
  ): Promise<MessageEntity> {
    const { user } = await this.jwtTokenService.findToken(token);

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

  async deleteCurrentMessage() {
    return 'delete current message from current room';
  }
}
