import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import ChatEntity from '../entities/chat.entity';
import { ChatService } from './chat.service';

@ApiTags('Chat')
@UseGuards(AuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @ApiOperation({ summary: 'Get all chats by owner' })
  @ApiResponse({ status: 200, type: () => [ChatEntity] })
  @Get('/all')
  async getAllChats() {
    try {
      //return this.chatService.getAllChats();
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
  async getCurrentChat(@Param() channel: string) {
    try {
      return this.chatService.getCurrenChat(channel);
    } catch (e) {
      throw new HttpException(
        `Не удалось получить "${channel}" чат`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Mute a current ' })
  @ApiResponse({ status: 200, type: () => ChatEntity })
  @Post('/mute/:channel')
  async muteCurrentChat(@Param() channel: string, @Body() mute: boolean) {
    try {
      return this.chatService.muteCurrentChat(channel, mute);
    } catch (e) {
      throw new HttpException(
        `Не удалось замьютить "${channel}" чат`,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Get all chats by owner' })
  @ApiResponse({ status: 201, type: () => [ChatEntity] })
  @Post('/censooret/:channel')
  async censooretCurrentChat(
    @Param() channel: string,
    @Body() censooret: boolean,
  ) {
    try {
      return this.chatService.censooretCurrentChat(channel, censooret);
    } catch (e) {
      throw new HttpException(
        `Не удалось зацензурить чат ${channel}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Get all chats by owner' })
  @ApiResponse({ status: 200, type: () => [ChatEntity] })
  @Delete('/delete/:channel')
  async deleteCurrentChat(channel: string) {
    try {
      return this.chatService.deleteCurrentChat(channel);
    } catch (e) {
      throw new HttpException(
        `Не удалось удалить чат "${channel}"`,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
