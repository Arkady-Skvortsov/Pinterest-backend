import { ApiProperty } from '@nestjs/swagger';
import UserEntity from '../entities/users.entity';

export type pinMedia = 'Board' | 'Pin';

export default class CreateMessagesDTO<T> {
  @ApiProperty({})
  readonly owner: UserEntity;
  @ApiProperty({
    type: String,
    example: 'Hello, Arkadiy, can we call you later?',
    description: 'Text of the current message',
  })
  readonly text: T;

  @ApiProperty({
    type: String,
    example: '{pin: "TLOU2 art"}',
    description: 'Media a current message',
  })
  readonly media: T;

  @ApiProperty({ type: Date, example: '', description: '' })
  readonly time: Date;

  @ApiProperty({
    type: () => UserEntity,
    example: 'Elenea',
    description: 'Catcher of the current message',
  })
  readonly catcher: UserEntity;
}
