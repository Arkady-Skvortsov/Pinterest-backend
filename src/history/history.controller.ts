import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('History')
@Controller('history')
export class HistoryController {}
