import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HistoryService } from './history.service';
import { CacheInterceptor } from '../redis/cache.interceptor';
import { AuthGuard } from '../auth/auth.guard';
import HistoryEntity from '../entities/history.entity';

@ApiTags('History')
@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard)
@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @ApiOperation({ summary: 'Get all history' })
  @ApiResponse({ status: 200, type: () => HistoryEntity })
  @Get('/all')
  async getAllHistory(@Req() request: Request) {
    try {
      const token = request.headers.authorization.split(' ')[1];

      return this.historyService.getAllHistory(token);
    } catch (e) {
      throw new HttpException(
        `Не удалось получить все истории`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Get current history by her id' })
  @ApiResponse({ type: () => HistoryEntity, status: 200 })
  @Get('/current/:id')
  async getCurrentHistory(@Param('id') id: number) {
    try {
      return this.historyService.getCurrentHistory('', id);
    } catch (e) {
      throw new HttpException(
        `Не удалось получить историю "${id}"`,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Delete a current history by her id' })
  @ApiResponse({ type: () => HistoryEntity, status: 204 })
  @Delete('/delete/:id')
  async deleteCurrentHistory(@Param('id') id: number) {
    try {
      return this.historyService.deleteCurrentHistory('', id);
    } catch (e) {
      throw new HttpException(
        `Не удалось удалить историю "${id}"`,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
