import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtTokenModule } from '../jwt-token/jwt-token.module';
import { BoardsModule } from '../boards/boards.module';
import { PinsModule } from '../pins/pins.module';
import { UsersModule } from '../users/users.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import UserEntity from '../entities/users.entity';
import PinEntity from '../entities/pin.entity';
import { BoardEntity } from 'src/entities/board.entity';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [
    TypeOrmModule.forFeature([UserEntity, PinEntity, BoardEntity]),
    PinsModule,
    BoardsModule,
    UsersModule,
    JwtTokenModule,
  ],
  exports: [SearchService],
})
export class SearchModule {}
