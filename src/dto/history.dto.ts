import { ApiProperty } from '@nestjs/swagger';
import { BoardEntity } from '../entities/board.entity';
import CommentEntity from '../entities/comment.entity';
import PinEntity from '../entities/pin.entity';

export type historyMedia = PinEntity | BoardEntity | CommentEntity;

export default class CreateHistoryDTO {
  @ApiProperty({
    type: String,
    example: 'Arkadiy',
    description: 'Author of the current history',
  })
  readonly author: string;

  //Todo: Realise save the users comments, which he sended under comments

  @ApiProperty({
    type: () => [PinEntity],
    example: '[RDR2 superpin, testing hero, MUSTER of carate]',
    description: 'Pins, which user had seen in application',
  })
  readonly saved_pins?: PinEntity[];

  @ApiProperty({
    type: () => [BoardEntity],
    example: '[board1, board2, board3]',
    description: 'Boards, which user had seen in application',
  })
  readonly saved_boards?: BoardEntity[];
}
