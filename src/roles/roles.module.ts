import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RoleEntity from '../entities/roles.entity';
import UserEntity from '../entities/users.entity';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [TypeOrmModule.forFeature([RoleEntity, UserEntity])],
  exports: [RolesService],
})
export class RolesModule {}
