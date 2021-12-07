import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RoleEntity from '../entities/roles.entity';
import CreateRoleDTO from '../dto/role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity) private roleEntity: Repository<RoleEntity>,
  ) {}

  async getAllRoles(): Promise<RoleEntity[]> {
    const roles = await this.roleEntity.find();

    return roles;
  }

  async getCurrentRole(roleName: string): Promise<RoleEntity> {
    const currentRole = await this.roleEntity.findOne({
      where: { title: roleName },
    });

    return currentRole;
  }

  async createNewRole(dto: CreateRoleDTO<string>): Promise<RoleEntity> {
    const newRole = await this.roleEntity.create(dto);

    return newRole;
  }

  async updateCurrentRole(
    title: string,
    dto: CreateRoleDTO<string>,
  ): Promise<RoleEntity> {
    const currentRole = await this.getCurrentRole(title);

    await this.roleEntity.update(currentRole, dto);

    return currentRole;
  }

  async deleteCurrentRole(title: string): Promise<number> {
    const currentRole = await this.getCurrentRole(title);

    await this.roleEntity.delete(currentRole);

    return currentRole.id;
  }
}
