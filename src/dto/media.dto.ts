import { BoardEntity } from '../entities/board.entity';
import PinEntity from '../entities/pin.entity';
import CreateBoardDTO from './board.dto';
import CreatePinDTO from './pin.dto';

export type gMedia = 'pin' | 'board';
export type cacheTypes = gMedia | 'comment' | 'message' | 'notification';
export type mediaDTO = CreateBoardDTO<string> | CreatePinDTO;
export type mediaEntity = BoardEntity | PinEntity;
