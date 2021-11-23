import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@users/users.module';
import NotificationEntity from 'src/entities/notification.entity';
import UserEntity from 'src/entities/users.entity';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService],
  imports: [
    TypeOrmModule.forFeature([NotificationEntity, UserEntity, UsersModule]),
  ],
})
export class NotificationModule {}
