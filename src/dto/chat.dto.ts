import { ApiProperty } from '@nestjs/swagger';
import CreateUserDTO from './users.dto';

export default class CreateChatDTO {
  @ApiProperty({ type: Number })
  readonly id?: number;

  @ApiProperty({
    type: () => CreateUserDTO,
    example: 'Serega',
    description: 'Owner of the current chat',
  })
  readonly owner: CreateUserDTO;

  @ApiProperty({ type: String, example: '', description: '' })
  readonly title: string;

  @ApiProperty({
    type: () => CreateUserDTO,
    description: 'Catcher of the current message in chat from owner',
    example: 'Arkadiy',
  })
  readonly catcher: CreateUserDTO;
}
