import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestCustom } from '../interfaces/auth.interface';
import { AuthGuard } from '../auth/auth.guard';
import { UserSettingsService } from './user-settings.service';
import AccountSettingsEntity from '../entities/account-settings.entity';
import IUsersSettings from '../interfaces/users-settings.interface';

@ApiTags('UserSettings')
@UseGuards(AuthGuard)
@Controller('user-settings')
export class UserSettingsController {
  //Todo: Fix implementation by IUserSerttings interface
  constructor(private usersSettingsService: UserSettingsService) {}

  @ApiOperation({ summary: 'Get all settings from current user' })
  @ApiResponse({ status: 200, type: () => AccountSettingsEntity })
  @Get('/all')
  async getAllSettings(@Request() request: RequestCustom) {
    try {
      return this.usersSettingsService;
    } catch (e) {
      throw new HttpException(
        `Не удалось получить полный список настроек пользователя ${request.user.username}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Get a current setting by current user' })
  @ApiResponse({ status: 200, type: () => AccountSettingsEntity })
  @Get('/current/:title')
  async getCurrentSettings(@Request() request: RequestCustom) {
    try {
    } catch (e) {
      throw new HttpException(
        `Не удалось взять конкретные настроки пользователя ${request.user.username}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Update a current setting of current user' })
  @ApiResponse({ status: 203, type: String })
  async updateCurrentSettings(@Request() request: RequestCustom) {
    try {
      return 'update';
    } catch (e) {
      throw new HttpException(
        `Не удалось обновить конкретные настройки пользователя ${request.user.username}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({
    summary: 'Delete a current setting of user (Correctly - set empty string)',
  })
  @ApiResponse({ type: String, status: 204 })
  async deleteCurrentSettings(@Request() request: RequestCustom) {
    try {
      return 'delete';
    } catch (e) {
      throw new HttpException(
        `Не удалось удалить конкретную настройку пользователя ${request.user.username}`,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
