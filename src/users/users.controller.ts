import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import Request from 'express';
import { RolesGuard } from '../roles/roles.guard';
import { AuthGuard } from '../auth/auth.guard';
import banDTO from '../dto/ban.dto';
import CreateUserDTO from '../dto/users.dto';
import { UsersService } from './users.service';
import { UsersGuard } from './users.guard';

@ApiTags('Users')
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ type: Object, status: 200 })
  @Get('/all')
  async getAllUsers() {
    try {
      return this.usersService.getAllUsers();
    } catch (e) {
      throw new HttpException(
        'Не удалось найти всех пользователей',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Update current user' })
  @ApiResponse({ status: 203, type: Object })
  @UseInterceptors(FileInterceptor('photo'))
  @Put('/update')
  async updateCurrentUser(
    @Req() req: Request,
    @Body() dto: CreateUserDTO<string>,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    try {
      return this.usersService.updateCurrentUser('', dto); //Todo: Fix token/guard problem right here
    } catch (e) {
      throw new HttpException(
        'Не удалось обновить пользователя',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Ban current user(Admin)' })
  @ApiResponse({ status: 201, type: String })
  @UseGuards(RolesGuard)
  @Post('/ban/:title')
  async banCurrentUser(@Param() title: string, @Body() dto: banDTO<string>) {
    try {
      return this.usersService.banCurrentUser(title, dto);
    } catch (e) {
      throw new HttpException(
        'Не удалось забанить данного пользователя',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Subscribe on the current author' })
  @ApiResponse({ type: Object, status: 201 })
  @UseGuards(AuthGuard, UsersGuard)
  @Post('/subscribe/:username') //Todo: Fix problems with request payload later
  async subscribe(@Body() token: string, @Query('username') username: string) {
    try {
      return this.usersService.subscribe(token, username);
    } catch (e) {
      throw new HttpException(
        `Не удалось подписаться на ${username}, попробуйте чуть позже`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Unsubscribe from the current user' })
  @ApiResponse({ type: String, status: 201 })
  @UseGuards(AuthGuard)
  @Post('/unsubscribe/:username')
  async unsubscribe(
    @Body() token: string,
    @Query('username') username: string,
  ) {
    try {
      return this.usersService.unsubscribe(token, username);
    } catch (e) {
      throw new HttpException(
        'Не удалось отписаться от автора',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
