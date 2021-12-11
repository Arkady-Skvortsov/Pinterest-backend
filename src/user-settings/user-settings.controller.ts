import {
  Controller,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { UserSettingsService } from './user-settings.service';

@ApiTags('UserSettings')
@UseGuards(AuthGuard)
@Controller('user-settings')
export class UserSettingsController {
  constructor(private usersSettingsService: UserSettingsService) {}

  async getAllSettings() {
    try {
    } catch (e) {
      throw new HttpException('', HttpStatus.BAD_REQUEST);
    }
  }

  async getCurrentSettings() {
    try {
    } catch (e) {
      throw new HttpException('', HttpStatus.BAD_REQUEST);
    }
  }

  async createNewSettings() {
    try {
    } catch (e) {
      throw new HttpException('', HttpStatus.BAD_REQUEST);
    }
  }

  async updateCurrentSettings() {
    try {
      return 'update';
    } catch (e) {
      throw new HttpException('', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteCurrentSettings() {
    try {
      return 'delete';
    } catch (e) {
      throw new HttpException('', HttpStatus.FORBIDDEN);
    }
  }
}
