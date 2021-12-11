import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ChatService } from '../chat/chat.service';
import { MessagesService } from './messages.service';

@Injectable()
export class MessagesPipe implements PipeTransform {
  constructor(
    private messagesService: MessagesService,
    private chatService: ChatService,
  ) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      const regexp = new RegExp(/\[A-Z]/g);

      console.log(value, metadata);

      return value;
    } catch (e) {
      throw new HttpException('', HttpStatus.BAD_REQUEST);
    }
  }
}
