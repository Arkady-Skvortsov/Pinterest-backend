import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import RoleEntity from 'src/entities/roles.entity';
import UserEntity from 'src/entities/users.entity';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [TypeOrmModule.forFeature([RoleEntity, UserEntity])],
})
export class RolesModule {}
