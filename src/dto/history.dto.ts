import { BoardEntity } from '../entities/board.entity';
import CommentEntity from '../entities/comment.entity';
import PinEntity from '../entities/pin.entity';

export type historyMedia = PinEntity | BoardEntity | CommentEntity;

export default interface CreateHistoryDTO {
  somthing: string;
}
