import { ApiProperty } from '@nestjs/swagger';
import CreateUserDTO from './users.dto';

export type CreatePaylodDTO<T> = {
  username: T;
  role: T;
};

export class createTokenDTO<T = string> {
  @ApiProperty({ type: Number })
  id?: number;

  @ApiProperty({ type: String, description: '', example: '' })
  token: T;

  @ApiProperty({ type: () => CreateUserDTO, description: '', example: '' })
  user?: CreateUserDTO<T>;
}
