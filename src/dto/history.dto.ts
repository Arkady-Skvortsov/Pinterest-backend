import { ApiProperty } from '@nestjs/swagger';
import CreateBoardDTO from './board.dto';
import CreateCommentDTO from './comment.dto';
import CreatePinDTO from './pin.dto';
import CreateUserDTO from './users.dto';

export type historyMedia = CreatePinDTO | CreateBoardDTO | CreateCommentDTO;

export default class CreateHistoryDTO {
  @ApiProperty({ type: Number })
  readonly id?: number;

  @ApiProperty({
    type: String,
    example: 'Arkadiy',
    description: 'Author of the current history',
  })
  readonly author: CreateUserDTO;

  @ApiProperty({
    type: () => CreateCommentDTO,
    description:
      'Media of the current history: [CreateCommentDTO, CreateBoardDTO, CreatePinDTO]',
    example: '',
  })
  readonly saved_media: historyMedia;
}
