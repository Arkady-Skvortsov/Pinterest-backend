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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '../redis/cache.interceptor';
import { AuthGuard } from '../auth/auth.guard';
import { MessagesService } from './messages.service';
import { UsersGuard } from '../users/users.guard';
import MessageEntity from '../entities/messages.entity';

@ApiTags('Messages')
@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard, UsersGuard)
@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @ApiOperation({ summary: 'Get all messages from current user' })
  @ApiResponse({ type: () => MessageEntity, status: 200 })
  @Get('/:username/all')
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

  @ApiOperation({ summary: 'Get current message by his id ' })
  @ApiResponse({ type: () => MessageEntity, status: 200 })
  @Get('/current/:username/:id')
  async getCurrentMessage(
    token: string,
    @Param('username') username: string,
    @Param('id') id: number,
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

  @ApiOperation({
    summary: 'Update current message from current channel by his id',
  })
  @ApiResponse({ type: () => MessageEntity, status: 203 })
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

  @ApiOperation({
    summary: 'Delete current message from current channel by his id',
  })
  @ApiResponse({ status: 204, type: Number })
  @Delete('/delete/:username/:id')
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
