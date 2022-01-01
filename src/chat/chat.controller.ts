import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestCustom } from '../interfaces/auth.interface';
import { AuthGuard } from '../auth/auth.guard';
import ChatEntity from '../entities/chat.entity';
import { ChatService } from './chat.service';
import IChat from '../interfaces/chat.interfaes';
import { MediaGuard } from '../media/media.guard';
import { MediaType } from 'src/decorators/media.decorator';

@ApiTags('Chat')
@UseGuards(AuthGuard, MediaGuard)
@MediaType('chat')
@Controller('chat')
export class ChatController implements IChat {
  constructor(private chatService: ChatService) {}

  @ApiOperation({ summary: 'Get all chats by owner' })
  @ApiResponse({ status: 200, type: () => [ChatEntity] })
  @Get('/all')
  async getAllChats(@Request() request: RequestCustom): Promise<ChatEntity[]> {
    try {
      return this.chatService.getAllChats(request.user);
    } catch (e) {
      throw new HttpException(
        'Не удалось получить все ваши чаты',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Get current chat by current channel' })
  @ApiResponse({ status: 200, type: () => ChatEntity })
  @Get('/current/:channel')
  async getCurrentChat(
    @Request() request: RequestCustom,
    @Param() channel: string,
  ): Promise<ChatEntity> {
    try {
      return this.chatService.getCurrentChat(request.user, channel);
    } catch (e) {
      throw new HttpException(
        `Не удалось получить "${channel}" чат`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Mute a current chat' })
  @ApiResponse({ status: 201, type: () => ChatEntity })
  @Post('/mute/:channel')
  async muteCurrentChat(
    @Request() request: RequestCustom,
    @Param() channel: string,
    @Body() mute: boolean,
  ): Promise<string> {
    try {
      return this.chatService.muteCurrentChat(request.user, channel, mute);
    } catch (e) {
      throw new HttpException(
        `Не удалось замьютить "${channel}" чат`,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'censooret a current chat' })
  @ApiResponse({ status: 201, type: () => ChatEntity })
  @Post('/censooret/:channel')
  async censooretCurrentChat(
    @Request() request: RequestCustom,
    @Param() channel: string,
    @Body() censooret: boolean,
  ): Promise<ChatEntity> {
    try {
      return this.chatService.censooretCurrentChat(
        request.user,
        channel,
        censooret,
      );
    } catch (e) {
      throw new HttpException(
        `Не удалось зацензурить чат ${channel}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'delete current chat' })
  @ApiResponse({ status: 200, type: () => ChatEntity })
  @Delete('/delete/:channel')
  async deleteCurrentChat(
    @Request() request: RequestCustom,
    @Param() channel: string,
  ): Promise<string> {
    try {
      return this.chatService.deleteCurrentChat(request.user, channel);
    } catch (e) {
      throw new HttpException(
        `Не удалось удалить чат "${channel}"`,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
