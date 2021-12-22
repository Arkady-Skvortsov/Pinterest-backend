import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import CreateRoleDTO from '../dto/role.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from './roles.guard';
import { RolesService } from './roles.service';
import IRoles from '../interfaces/roles.interfaces';
import { Roles } from '../decorators/roles.decorator';

@ApiTags('Roles')
@UseGuards(AuthGuard, RolesGuard, Roles('admin'))
@Roles('admin')
@Controller('roles')
export class RolesController implements IRoles {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Get all roles in system' })
  @ApiResponse({ type: Array, status: 200 })
  @Get('/all')
  async getAllRoles() {
    try {
      return this.rolesService.getAllRoles();
    } catch (e) {
      throw new HttpException(
        'Не удалось взять все роли',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Get current role by her title' })
  @ApiResponse({ type: Object, status: 200 })
  @Get('/current/:title')
  async getCurrentRole(@Param('title') title: string) {
    try {
      return this.rolesService.getCurrentRole(title);
    } catch (e) {
      throw new HttpException(
        `Не удалось найти роль (${title})`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Create new role' })
  @ApiResponse({ type: Object, status: 201 })
  @Post('/create')
  async createNewRole(@Body() payload: CreateRoleDTO<string>) {
    try {
      return this.rolesService.createNewRole(payload);
    } catch (e) {
      throw new HttpException(
        `Не удалось создать роль (${payload.title})`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Update current role by this title' })
  @ApiResponse({ type: Object, status: 203 })
  @Put('/update/:title')
  async updateCurrentRole(
    @Param('title') title: string,
    @Body() payload: CreateRoleDTO<string>,
  ) {
    try {
      return this.rolesService.updateCurrentRole(title, payload);
    } catch (e) {
      throw new HttpException(
        `Не удалось обновить роль (${title})`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Delete current role by her title' })
  @ApiResponse({ type: Number, status: 204 })
  @Delete('/delete/:title')
  async deleteCurrentRole(@Param('title') title: string) {
    try {
      return this.rolesService.deleteCurrentRole(title);
    } catch (e) {
      throw new HttpException(
        `Не удалось удалить роль (${title})`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
