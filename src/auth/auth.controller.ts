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
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { JwtTokenGuard } from '@jwt-token/jwt-token.guard';
import { Request, Response } from 'express';
import { AuthPipe } from './auth.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import CreateUserDTO from 'src/dto/users.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Registration of the new user' })
  @ApiResponse({ status: 201, type: Object })
  @UsePipes(AuthPipe)
  @UseInterceptors(FileInterceptor('photo'))
  @Post('/registration')
  async registration(
    @Res() response: Response,
    //@Body() dto: CreateUserDTO<string>,
    //@UploadedFile('photo') photo: Express.Multer.File,
  ) {
    try {
      console.log('registrations');
      //const newUser = await this.authService.registration(dto, photo);

      // response.cookie('jwt', newUser.refreshToken, {
      //   expires: new Date(Date.now() + 24 * 60 * 60 * 3600),
      // });

      //return response.send(newUser);
    } catch (e) {
      throw new HttpException(
        'Не удалось зарегистрироваться',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Authorization of the user' })
  @ApiResponse({ status: 201, type: Object })
  @UseGuards(JwtTokenGuard, AuthGuard)
  @Post('/authorization')
  async authorization(@Body() dto: any) {
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
  @UseGuards(JwtTokenGuard, AuthGuard)
  @Post('/logout')
  async logout(@Req() request: Request) {
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
  @UseGuards(JwtTokenGuard, AuthGuard)
  @Delete('/delete')
  async deleteAccount(@Req() request: Request) {
    try {
      const token = request.headers.authorization.split(' ')[1];

      return this.authService.deleteAccount(token);
    } catch (e) {
      throw new HttpException(
        'Не удалось удалить акканут',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
