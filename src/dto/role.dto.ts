import { ApiProperty } from '@nestjs/swagger';

export type roles = 'admin' | 'user';

export default class CreateRoleDTO<T = string> {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Id of the current Role',
  })
  readonly id?: number;

  @ApiProperty({
    type: String,
    example: 'Admin',
    description: 'Title of the current Role',
  })
  readonly title: T;

  @ApiProperty({
    type: String,
    example: 'You can ban current User and more :)',
    description: 'Description of the current Role',
  })
  readonly description: T;
}
