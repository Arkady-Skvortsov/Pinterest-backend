import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '../redis/cache.interceptor';
import { AuthGuard } from '../auth/auth.guard';
import { MessagesService } from './messages.service';
import { UsersGuard } from '../users/users.guard';

@ApiTags('Messages')
@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard, UsersGuard)
@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get('/all')
  async getAllMessages(token: string, @Body() username: string) {
    try {
      return this.messagesService.getAllMessages(token, username);
    } catch (e) {
      throw new HttpException(
        `Не удалось взять все сообщения от ${username}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/current/:id')
  async getCurrentMessage(
    token: string,
    @Body() username: string,
    @Param() id: number,
  ) {
    try {
      return this.messagesService.getCurrentMessage(token, username, id);
    } catch (e) {
      throw new HttpException(
        `Не удалось получить сообщение от ${username}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('/update/:username/:id')
  async updateCurrentMessage(
    token: string,
    @Body() payload: any,
    @Param('username') username: string,
    @Param('id') id: number,
  ) {
    try {
      return this.messagesService.updateCurrentMessage(
        token,
        payload,
        username,
        id,
      );
    } catch (e) {
      throw new HttpException(
        'Не удалось обновить сообщение',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Delete('/delete/:id')
  async deleteCurrentMessage(
    token: string,
    @Body() username: string,
    @Param() id: number,
  ) {
    try {
      return this.messagesService.deleteCurrentMessage();
    } catch (e) {
      throw new HttpException(
        `Не удалось удалить сообщение от ${username}`,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
