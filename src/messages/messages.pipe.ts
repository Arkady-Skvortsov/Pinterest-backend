import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  Request,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ChatService } from '../chat/chat.service';
import { MessagesService } from './messages.service';
import { RequestCustom } from '../interfaces/auth.interface';

@Injectable()
export class MessagesPipe implements PipeTransform {
  constructor(
    @Request() private request: RequestCustom,
    private messagesService: MessagesService,
    private chatService: ChatService,
    private usersService: UsersService,
  ) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const user = this.request.user;

    this.chatService.getCurrentChat(
      this.request.user,
      this.request.params.channel,
    );

    console.log(value, metadata);

    return value;
  }
}
