import {
  Controller,
  HttpException,
  HttpStatus,
  UseGuards,
  Post,
  Delete,
  Body,
  Res,
  UsePipes,
  UseInterceptors,
  UploadedFile,
  Request,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AuthPipe } from './auth.pipe';
import CreateUserDTO from '../dto/users.dto';
import UserEntity from '../entities/users.entity';
import { IAuth, RequestCustom } from '../interfaces/auth.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController implements IAuth {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Registration of the new user' })
  @ApiResponse({ status: 201, type: () => UserEntity })
  @UsePipes(AuthPipe)
  @UseInterceptors(FileInterceptor('photo'))
  @Post('/registration')
  async registration(
    @Res() res: Response,
    @Body() dto: CreateUserDTO<string>,
    @UploadedFile() photo: Express.Multer.File,
  ): Promise<UserEntity> {
    try {
      const newUser = await this.authService.registration(dto, photo);

      res.cookie('jwt-token', newUser.refreshToken, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 3600),
      });

      res.send(newUser);

      return newUser;
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Не удалось зарегистрироваться',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Authorization of the user' })
  @ApiResponse({ status: 201, type: () => UserEntity })
  @UseGuards(AuthGuard)
  @Post('/authorization')
  async authorization(@Request() request: RequestCustom): Promise<UserEntity> {
    try {
      return this.authService.authorization(request.user);
    } catch (e) {
      throw new HttpException(
        'Не удалось авторизироваться',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Logout from user account' })
  @ApiResponse({ status: 201, type: String })
  @UseGuards(AuthGuard)
  @Post('/logout')
  async logout(@Request() request: RequestCustom): Promise<string> {
    try {
      return this.authService.logout(request.user);
    } catch (e) {
      throw new HttpException(
        `Не удалось выйти с акканута ${request.user.username}`,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Delete user account' })
  @ApiResponse({ status: 204, type: String })
  @UseGuards(AuthGuard)
  @Delete('/delete')
  async deleteAccount(@Request() request: RequestCustom): Promise<string> {
    try {
      return this.authService.deleteAccount(request.user);
    } catch (e) {
      throw new HttpException(
        `Не удалось удалить акканут ${request.user.username}`,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
