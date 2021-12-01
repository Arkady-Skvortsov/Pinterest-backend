import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { JwtTokenModule } from '../jwt-token/jwt-token.module';
import { PinsModule } from '../pins/pins.module';
import { BoardsModule } from '../boards/boards.module';
import { MyRedisAdapter } from '../redis/redis.service';

@Module({
  providers: [MediaService],
  controllers: [MediaController],
  imports: [JwtTokenModule, PinsModule, BoardsModule, MyRedisAdapter],
  exports: [MediaService],
})
export class MediaModule {}
