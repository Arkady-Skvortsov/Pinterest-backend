import { ApiProperty } from '@nestjs/swagger';
import MessageEntity from '../entities/messages.entity';
import UserEntity from '../entities/users.entity';
import CreateBoardDTO from './board.dto';
import CreateChatDTO from './chat.dto';
import CreatePinDTO from './pin.dto';
import CreateUserDTO from './users.dto';

export type pinMedia = CreateBoardDTO | CreatePinDTO;

export default class CreateMessagesDTO<R = CreateUserDTO> {
  @ApiProperty({
    type: Number,
    description: 'Primary key of the table',
    example: 12,
  })
  readonly id?: number;

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
  readonly media?: pinMedia;

  @ApiProperty({ type: Date, example: '', description: '' })
  readonly time: Date;

  @ApiProperty({
    type: () => CreateUserDTO,
    example: 'Elenea',
    description: 'Catcher of the current message',
  })
  readonly catcher: R;

  @ApiProperty({
    type: () => [CreateMessagesDTO],
    example: 'Some example',
    description: 'Replies to current comment',
  })
  readonly replyes?: CreateMessagesDTO[];

  @ApiProperty({ type: () => CreateUserDTO, example: '', description: '' })
  readonly chat?: CreateChatDTO;
}
