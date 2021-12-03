import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import NotificationEntity from '../entities/notification.entity';
import UserEntity from '../entities/users.entity';
import { NotificationController } from './notification.controller';
import { NotificationObserverService } from './notification.service';

@Module({
  controllers: [NotificationController],
  providers: [NotificationObserverService],
  imports: [TypeOrmModule.forFeature([NotificationEntity, UserEntity])],
  exports: [NotificationObserverService],
})
export class NotificationModule {}
