import { Module } from '@nestjs/common';
import { BoardsModule } from '../boards/boards.module';
import { PinsModule } from '../pins/pins.module';
import { UsersModule } from '../users/users.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [PinsModule, BoardsModule, UsersModule],
  exports: [SearchService],
})
export class SearchModule {}
