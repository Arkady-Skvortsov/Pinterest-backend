import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ type: Object, status: 200 })
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
}
