import { ApiProperty } from '@nestjs/swagger';
import CreateRoleDTO from './role.dto';
import CreateUserDTO from './users.dto';

export type CreatePaylodDTO<T = string> = {
  username: T;
  role: T;
};

export class createTokenDTO {
  @ApiProperty({
    type: Number,
    example: 12,
    description: 'Primary key of the current table',
  })
  readonly id?: number;

  @ApiProperty({ type: String, description: '', example: '' })
  readonly token: string;

  @ApiProperty({ type: () => CreateUserDTO, description: '', example: '' })
  readonly user?: CreateUserDTO;

  @ApiProperty({ type: () => CreateRoleDTO })
  readonly role?: CreateRoleDTO;
}
