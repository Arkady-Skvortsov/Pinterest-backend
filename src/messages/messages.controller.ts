import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '../redis/cache.interceptor';
import { AuthGuard } from '../auth/auth.guard';
import { MessagesService } from './messages.service';

@ApiTags('Messages')
@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard)
@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}
}
