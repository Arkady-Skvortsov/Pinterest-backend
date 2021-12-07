import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtTokenModule } from '../jwt-token/jwt-token.module';
import NotificationEntity from '../entities/notification.entity';
import UserEntity from '../entities/users.entity';
import {
  NotificationObserverService,
  NotificationService,
} from './notification.service';
import { NotificationController } from './notification.controller';
import { UsersModule } from '../users/users.module';
import { JwtTokenService } from '../jwt-token/jwt-token.service';

@Module({
  controllers: [NotificationController],
  providers: [NotificationObserverService, NotificationService],
  imports: [
    TypeOrmModule.forFeature([NotificationEntity, UserEntity]),
    JwtTokenModule,
  ],
  exports: [NotificationService, NotificationObserverService],
})
export class NotificationModule {}
