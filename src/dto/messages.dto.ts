import { ApiProperty } from '@nestjs/swagger';
import MessageEntity from '../entities/messages.entity';
import UserEntity from '../entities/users.entity';

export type pinMedia = 'Board' | 'Pin';

export default class CreateMessagesDTO<R = UserEntity> {
  @ApiProperty({
    type: () => UserEntity,
    example: 'Sergey',
    description: 'Owner of the current message',
  })
  readonly owner: R;

  @ApiProperty({
    type: String,
    example: 'Hello, Arkadiy, can we call you later?',
    description: 'Text of the current message',
  })
  readonly text: string;

  @ApiProperty({
    type: String,
    example: '{pin: "TLOU2 art"}',
    description: 'Media a current message',
  })
  readonly media: pinMedia;

  @ApiProperty({ type: Date, example: '', description: '' })
  readonly time: Date;

  @ApiProperty({
    type: () => UserEntity,
    example: 'Elenea',
    description: 'Catcher of the current message',
  })
  readonly catcher: R;

  @ApiProperty({
    type: () => [MessageEntity],
    example: 'Some example',
    description: 'Replies to current comment',
  })
  readonly replyes?: MessageEntity[];
}
