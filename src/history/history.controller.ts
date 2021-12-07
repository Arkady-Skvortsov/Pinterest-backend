import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HistoryMementoService } from './history.service';
import { CacheInterceptor } from '../redis/cache.interceptor';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('History')
@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard)
@Controller('history')
export class HistoryController {
  constructor(private historyMementoService: HistoryMementoService) {}
}
