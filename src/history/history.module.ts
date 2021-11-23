import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import HistoryEntity from 'src/entities/history.entity';
import PinEntity from 'src/entities/pin.entity';
import UserEntity from 'src/entities/users.entity';

@Module({
  providers: [HistoryService],
  controllers: [HistoryController],
  imports: [TypeOrmModule.forFeature([HistoryEntity, PinEntity, UserEntity])],
})
export class HistoryModule {}
