import { BoardEntity } from '../entities/board.entity';
import PinEntity from '../entities/pin.entity';
import CreateBoardDTO from './board.dto';
import CreatePinDTO from './pin.dto';

export type gMedia = 'pin' | 'board' | 'comment';
export type cacheTypes = gMedia | 'comment' | 'message' | 'notification';
export type mediaDTO = CreateBoardDTO | CreatePinDTO;
export type mediaEntity = BoardEntity | PinEntity;
