import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { SearchPipe } from './search.pipe';
import { SearchService } from './search.service';

@ApiTags('Search')
@UseGuards(AuthGuard)
@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @ApiOperation({ summary: 'Search something by request' })
  @ApiResponse({ status: 200, type: [Object] })
  @UsePipes(SearchPipe)
  @Get('/:text')
  async search(@Query('text') text: string) {
    try {
      return this.searchService.search(text);
    } catch (e) {
      throw new HttpException(
        'Не удалось ничего найти по данному запросу',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
