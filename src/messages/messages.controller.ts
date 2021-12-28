import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Req,
  Request,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '../redis/cache.interceptor';
import { AuthGuard } from '../auth/auth.guard';
import { MessagesService } from './messages.service';
import { UsersGuard } from '../users/users.guard';
import MessageEntity from '../entities/messages.entity';
import { MessagesGuard } from './messages.guard';
import { RequestCustom } from '../interfaces/auth.interface';
import CreateMessagesDTO from '../dto/messages.dto';
import { CacheType } from '../decorators/cache.decorator';
import { MessagesPipe } from './messages.pipe';

@ApiTags('Messages')
@UseInterceptors(CacheInterceptor)
@CacheType('message')
@UseGuards(AuthGuard, UsersGuard)
@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @ApiOperation({ summary: 'Get all messages from current user' })
  @ApiResponse({ type: () => MessageEntity, status: 200 })
  @Get('/:username/all')
  async getAllMessages(
    @Request() request: RequestCustom,
    @Param() username: string,
  ) {
    try {
      return this.messagesService.getAllMessages(request.user, username);
    } catch (e) {
      throw new HttpException(
        `Не удалось взять все сообщения от ${username}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Get current message by his id ' })
  @ApiResponse({ type: () => MessageEntity, status: 200 })
  @CacheType('message')
  @Get('/current/:username/:id')
  async getCurrentMessage(
    @Request() request: RequestCustom,
    @Param('username') username: string,
    @Param('id') id: number,
  ) {
    try {
      return this.messagesService.getCurrentMessage(request.user, username, id);
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
  @UsePipes(MessagesPipe)
  @UseGuards(MessagesGuard)
  @Put('/update/:username/:id')
  async updateCurrentMessage(
    @Request() request: RequestCustom,
    @Body() dto: CreateMessagesDTO,
    @Param('id') id: number,
  ): Promise<MessageEntity> {
    try {
      return this.messagesService.updateCurrentMessage(request.message, dto);
    } catch (e) {
      throw new HttpException(
        `Не удалось обновить сообщение ${id}`,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({
    summary: 'Delete current message from current channel by his id',
  })
  @ApiResponse({ status: 204, type: Number })
  @UseGuards(MessagesGuard)
  @Delete('/delete/:username/:id')
  async deleteCurrentMessage(
    @Req() request: RequestCustom,
    @Body() username: string,
    @Param() id: number,
  ): Promise<number> {
    try {
      return this.messagesService.deleteCurrentMessage(
        request.user,
        username,
        id,
      );
    } catch (e) {
      throw new HttpException(
        `Не удалось удалить сообщение ${id}`,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
