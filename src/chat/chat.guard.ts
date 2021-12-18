import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ChatService } from './chat.service';

@Injectable()
export class ChatGuard implements CanActivate {
  constructor(private chatService: ChatService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    let currentChat;

    this.chatService
      .getCurrentChat(user, request.params.channel)
      .then((payload) => {
        currentChat = payload;
      })
      .catch((e) => console.log(e));

    if (
      currentChat.catcher.username ||
      currentChat.owner.username !== user.username
    ) {
      throw new HttpException(
        'Вы не можете получить чат который вы не писали',
        HttpStatus.FORBIDDEN,
      );
    }

    request.chat = currentChat;

    return true;
  }
}
