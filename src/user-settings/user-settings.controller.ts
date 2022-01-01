import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestCustom } from '../interfaces/auth.interface';
import { AuthGuard } from '../auth/auth.guard';
import { UserSettingsService } from './user-settings.service';
import AccountSettingsEntity from '../entities/account-settings.entity';
import IUsersSettings from '../interfaces/users-settings.interface';
import UpdateSettingsDTO from '../dto/user-settings.dto';

@ApiTags('UserSettings')
@UseGuards(AuthGuard)
@Controller('user-settings')
export class UserSettingsController {
  //Todo: Fix problems with `implements IUserSettings`
  constructor(private usersSettingsService: UserSettingsService) {}

  @ApiOperation({ summary: 'Get all settings from current user' })
  @ApiResponse({ status: 200, type: () => AccountSettingsEntity })
  @Get('/all')
  async getAllSettings(@Request() request: RequestCustom) {
    try {
      return this.usersSettingsService.getAllSettings(request.user);
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
  async getCurrentSettings(
    @Request() request: RequestCustom,
    @Param('title') title: string,
  ) {
    try {
      return this.usersSettingsService.getCurrentSettings(request.user, title);
    } catch (e) {
      throw new HttpException(
        `Не удалось взять конкретные настроки пользователя ${request.user.username}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Update a current setting of current user' })
  @ApiResponse({ status: 203, type: String })
  @Put('/update/:title')
  async updateCurrentSettings(
    @Request() request: RequestCustom,
    @Param('title') title: string,
    @Body() dto: UpdateSettingsDTO,
  ) {
    try {
      return this.usersSettingsService.updateCurrentSettings(
        request.user,
        title,
        dto,
      );
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
