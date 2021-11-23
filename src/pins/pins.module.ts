import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CommentEntity from 'src/entities/comment.entity';
import PinEntity from 'src/entities/pin.entity';
import UserEntity from 'src/entities/users.entity';
import { PinsController } from './pins.controller';
import { PinsService } from './pins.service';

@Module({
  controllers: [PinsController],
  providers: [PinsService],
  imports: [TypeOrmModule.forFeature([PinEntity, UserEntity, CommentEntity])],
})
export class PinsModule {}
