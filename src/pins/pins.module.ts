import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CommentEntity from '../entities/comment.entity';
import PinEntity from '../entities/pin.entity';
import UserEntity from '../entities/users.entity';
import { RedisModule } from '../redis/redis.module';
import { PinsService } from './pins.service';
import { PinsResolver } from './pins.resolver';
import { JwtTokenModule } from '../jwt-token/jwt-token.module';

@Module({
  providers: [PinsService, PinsResolver],
  imports: [
    TypeOrmModule.forFeature([PinEntity, UserEntity, CommentEntity]),
    RedisModule,
    JwtTokenModule,
  ],
  exports: [PinsService],
})
export class PinsModule {}
