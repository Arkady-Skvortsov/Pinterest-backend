import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Roles')
@UseGuards(AuthGuard)
@Controller('roles')
export class RolesController {}
