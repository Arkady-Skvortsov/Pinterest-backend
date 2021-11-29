import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import MessageEntity from 'src/entities/messages.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageEntity: Repository<MessageEntity>,
  ) {}
}
