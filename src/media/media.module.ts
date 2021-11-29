import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { JwtTokenModule } from '@jwt-token/jwt-token.module';
import { PinsModule } from '@pins/pins.module';
import { BoardsModule } from '@boards/boards.module';

@Module({
  providers: [MediaService],
  controllers: [MediaController],
  imports: [JwtTokenModule, PinsModule, BoardsModule],
  exports: [MediaService],
})
export class MediaModule {}
