import { SetMetadata } from '@nestjs/common';
import { roles } from '../dto/role.dto';

export const Roles = (roles: roles) => SetMetadata('roles', roles);
