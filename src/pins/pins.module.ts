import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CommentEntity from '../entities/comment.entity';
import PinEntity from '../entities/pin.entity';
import UserEntity from '../entities/users.entity';
import { PinsService } from './pins.service';
import { PinsResolver } from './pins.resolver';
import { JwtTokenModule } from '../jwt-token/jwt-token.module';
import { HistoryModule } from '../history/history.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  providers: [PinsService, PinsResolver],
  imports: [
    TypeOrmModule.forFeature([PinEntity, UserEntity, CommentEntity]),
    JwtTokenModule,
    HistoryModule,
    NotificationModule,
  ],
  exports: [PinsService],
})
export class PinsModule {}
