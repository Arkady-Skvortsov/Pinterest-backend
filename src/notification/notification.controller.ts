import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Notification')
@UseGuards(AuthGuard)
@Controller('notification')
export class NotificationController {}
