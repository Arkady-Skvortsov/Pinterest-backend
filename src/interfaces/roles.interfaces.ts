import CreateRoleDTO from '../dto/role.dto';
import RoleEntity from '../entities/roles.entity';

export default abstract class IRoles<
  T = RoleEntity,
  R = string,
  H = CreateRoleDTO<string>,
> {
  abstract getAllRoles(): Promise<T[]>;
  abstract getCurrentRole(title: R): Promise<T>;
  abstract createNewRole(dto: H): Promise<T>;
  abstract updateCurrentRole(title: R, dto: H): Promise<T>;
  abstract deleteCurrentRole(title: R): Promise<number>;
}
