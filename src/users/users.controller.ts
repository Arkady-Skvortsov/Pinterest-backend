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
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../roles/roles.guard';
import { AuthGuard } from '../auth/auth.guard';
import banDTO from '../dto/ban.dto';
import CreateUserDTO from '../dto/users.dto';
import { UsersService } from './users.service';
import { UsersGuard } from './users.guard';
import UserEntity from '../entities/users.entity';
import { RequestCustom } from '../interfaces/auth.interface';
import IUsers from '../interfaces/users.interface';
import { Roles } from '../decorators/roles.decorator';

@ApiTags('Users')
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController implements IUsers {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ type: () => [UserEntity], status: 200 })
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
  @ApiResponse({ status: 203, type: () => UserEntity })
  @UseInterceptors(FileInterceptor('photo'))
  @Put('/update')
  async updateCurrentUser(
    @Request() req: RequestCustom,
    @Body() dto: CreateUserDTO<string>,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    try {
      return this.usersService.updateCurrentUser(req.user, dto);
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
  @Roles('admin')
  @Post('/ban/:title')
  async banCurrentUser(
    @Request() request: RequestCustom,
    @Param() title: string,
    @Body() dto: banDTO<string>,
  ): Promise<string> {
    try {
      return this.usersService.banCurrentUser(request.user, title, dto);
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
  async subscribe(
    @Request() request: RequestCustom,
    @Query('username') username: string,
  ): Promise<string> {
    try {
      return this.usersService.subscribe(request.user, username);
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
    @Request() request: RequestCustom,
    @Query('username') username: string,
  ): Promise<string> {
    try {
      return this.usersService.unsubscribe(request.user, username);
    } catch (e) {
      throw new HttpException(
        'Не удалось отписаться от автора',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
