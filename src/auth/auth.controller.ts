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
  Req,
  Get,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AuthPipe } from './auth.pipe';
import CreateUserDTO from '../dto/users.dto';
import { JwtTokenGuard } from '../jwt-token/jwt-token.guard';
import UserEntity from 'src/entities/users.entity';
import AuthDTO from 'src/dto/auth.dto';
import { IAuth } from 'src/interfaces/auth.interface';

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
    @UploadedFile('photo') photo: Express.Multer.File,
  ) {
    try {
      const newUser = await this.authService.registration(dto, photo);

      // res.cookie('jwt', newUser.refreshToken, {
      //   expires: new Date(Date.now() + 24 * 60 * 60 * 3600),
      // });

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
  async authorization(@Body() dto: AuthDTO<string>): Promise<UserEntity> {
    try {
      return this.authService.authorization(dto);
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
  async logout(@Req() request: Request): Promise<string> {
    try {
      const token = request.headers.authorization.split(' ')[1];

      return this.authService.logout(token);
    } catch (e) {
      throw new HttpException(
        'Не удалось выйти с акканута',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Delete user account' })
  @ApiResponse({ status: 204, type: String })
  @UseGuards(AuthGuard)
  @Delete('/delete')
  async deleteAccount(@Req() request: Request): Promise<string> {
    try {
      const token = request.headers.authorization.split(' ')[1]; //Todo: Fix guard response

      return this.authService.deleteAccount(token);
    } catch (e) {
      throw new HttpException(
        'Не удалось удалить акканут',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
