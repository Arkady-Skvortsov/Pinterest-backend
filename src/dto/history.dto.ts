import { ApiProperty } from '@nestjs/swagger';
import { BoardEntity } from '../entities/board.entity';
import CommentEntity from '../entities/comment.entity';
import PinEntity from '../entities/pin.entity';
import { gMedia, mediaEntity } from './media.dto';

export type historyMedia = PinEntity | BoardEntity | CommentEntity;

export default class CreateHistoryDTO {
  @ApiProperty({
    type: String,
    example: 'Arkadiy',
    description: 'Author of the current history',
  })
  readonly author: string;

  @ApiProperty({
    type: String,
    example: 'pin',
    description: 'Media type of the current history',
  })
  readonly type: gMedia;

  @ApiProperty({
    type: String,
    example: 'The Last of us 2',
    description: 'Current media in that history',
  })
  readonly media: historyMedia;
}
