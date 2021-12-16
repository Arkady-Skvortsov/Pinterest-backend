import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HistoryService } from './history.service';
import { CacheInterceptor } from '../redis/cache.interceptor';
import { AuthGuard } from '../auth/auth.guard';
import HistoryEntity from '../entities/history.entity';
import { RequestCustom } from '../interfaces/auth.interface';

@ApiTags('History')
@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard)
@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @ApiOperation({ summary: 'Get all history' })
  @ApiResponse({ status: 200, type: () => HistoryEntity })
  @Get('/all')
  async getAllHistory(@Request() request: RequestCustom) {
    try {
      return this.historyService.getAllHistory(request.user);
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
  async getCurrentHistory(
    @Request() request: RequestCustom,
    @Param('id') id: number,
  ) {
    try {
      return this.historyService.getCurrentHistory(request.user, id);
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
  async deleteCurrentHistory(
    @Request() request: RequestCustom,
    @Param('id') id: number,
  ) {
    try {
      return this.historyService.deleteCurrentHistory(request.user, id);
    } catch (e) {
      throw new HttpException(
        `Не удалось удалить историю "${id}"`,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
