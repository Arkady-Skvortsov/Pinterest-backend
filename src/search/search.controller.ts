import {
  CacheInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import PinEntity from '../entities/pin.entity';
import { AuthGuard } from '../auth/auth.guard';
import { SearchPipe } from './search.pipe';
import { SearchService } from './search.service';
import { CacheType } from '../decorators/cache.decorator';

@ApiTags('Search')
@UseInterceptors(CacheInterceptor)
@CacheType('pin')
@UseGuards(AuthGuard)
@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @ApiOperation({ summary: 'Search something by request' })
  @ApiResponse({ status: 200, type: [Object] })
  @UsePipes(SearchPipe)
  @Get('/:text')
  async searchByText(@Query('text') text: string) {
    try {
      return this.searchService.searchByText(text);
    } catch (e) {
      throw new HttpException(
        'Не удалось ничего найти по данному запросу',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Search something by current tag' })
  @ApiBody({
    type: String,
    description: 'Tag, which was sended to a current media',
  })
  @ApiResponse({ type: () => [PinEntity], status: 200 })
  @Get('tags/:tag')
  async searchByTags(@Query('tag') tag: string) {
    try {
      return this.searchByTags(tag);
    } catch (e) {
      throw new HttpException(
        'Не удалось ничего найти по данному тэгу',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
