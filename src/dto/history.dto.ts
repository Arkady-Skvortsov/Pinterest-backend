import { ApiProperty } from '@nestjs/swagger';
import { BoardEntity } from '../entities/board.entity';
import CommentEntity from '../entities/comment.entity';
import PinEntity from '../entities/pin.entity';
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
    type: () => [CommentEntity],
    example: '[myComment1, myComment2, myComment3]',
    description: 'Comments, which user had been saved',
  })
  readonly saved_comments?: CreateCommentDTO[];

  @ApiProperty({
    type: () => [PinEntity],
    example: '[RDR2 superpin, testing hero, MUSTER of carate]',
    description: 'Pins, which user had seen in application',
  })
  readonly saved_pins?: CreatePinDTO[];

  @ApiProperty({
    type: () => [BoardEntity],
    example: '[board1, board2, board3]',
    description: 'Boards, which user had seen in application',
  })
  readonly saved_boards?: CreateBoardDTO[];
}
