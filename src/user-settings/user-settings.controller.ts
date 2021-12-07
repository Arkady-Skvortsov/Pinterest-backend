import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { UserSettingsService } from './user-settings.service';

@ApiTags('UserSettings')
@UseGuards(AuthGuard)
@Controller('user-settings')
export class UserSettingsController {
  constructor(private usersSettingsService: UserSettingsService) {}
}
