import PinEntity from '../entities/pin.entity';
import { BoardEntity } from '../entities/board.entity';
import UserEntity from '../entities/users.entity';

export type createSearchDTO = PinEntity | BoardEntity | UserEntity;
export type searchType = 'text' | 'tags';
