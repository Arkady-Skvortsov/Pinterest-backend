import { AuthGuard } from '@auth/auth.guard';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '@roles/roles.guard';
import { Request } from 'express';
import banDTO from 'src/dto/ban.dto';
import CreateBoardDTO from 'src/dto/board.dto';
import CreateUserDTO from 'src/dto/users.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ type: Object, status: 200 })
  @UseGuards(AuthGuard)
  @Get('/all')
  async getAllUsers() {
    try {
      return 'all users';
    } catch (e) {
      throw new HttpException(
        'Не удалось найти всех пользователей',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Update current user' })
  @ApiResponse({ status: 203, type: Object })
  @UseGuards(AuthGuard)
  @Put('/update')
  async updateCurrentUser(
    @Body() token: string,
    @Body() dto: CreateUserDTO<string>,
  ) {
    try {
      return this.usersService.updateCurrentUser(1, dto);
    } catch (e) {
      throw new HttpException(
        'Не удалось обновить пользователя',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Ban current user(Admin)' })
  @ApiResponse({ status: 201, type: String })
  @UseGuards(AuthGuard, RolesGuard)
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
}
