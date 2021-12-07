import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { JwtTokenModule } from '../jwt-token/jwt-token.module';
import { PinsModule } from '../pins/pins.module';
import { BoardsModule } from '../boards/boards.module';
import { RedisModule } from '../redis/redis.module';
import { HistoryModule } from '../history/history.module';
import { BoardEntity } from '../entities/board.entity';
import { MediaResolver } from './media.resolver';
import PinEntity from '../entities/pin.entity';

@Module({
  providers: [MediaService, MediaResolver],
  controllers: [MediaController],
  imports: [
    TypeOrmModule.forFeature([BoardEntity, PinEntity]),
    JwtTokenModule,
    PinsModule,
    BoardsModule,
    RedisModule,
    HistoryModule,
  ],
  exports: [MediaService],
})
export class MediaModule {}
