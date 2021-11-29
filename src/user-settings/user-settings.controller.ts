import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('UserSettings')
@Controller('user-settings')
export class UserSettingsController {}
