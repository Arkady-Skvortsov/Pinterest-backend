import { gMedia, mediaDTO, mediaEntity } from '../dto/media.dto';
import { RequestCustom } from './auth.interface';

export abstract class IMediaService<
  T = gMedia,
  R = string,
  C = mediaDTO,
  H = mediaEntity,
  D = boolean,
  K = RequestCustom,
> {
  abstract getAllMedia(request: K, type: T): Promise<H[]>;
  abstract getCurrentMedia(request: K, type: T, title: R): Promise<H>;
  abstract createNewMedia(request: K, type: T, dto: C): Promise<H>;
  abstract updateCurrentMedia(
    request: K,
    type: T,
    title: R,
    dto: C,
  ): Promise<H>;
  abstract addCurrentMedia(request: K, type: T, title: R, board: R): Promise<H>;
  abstract likeCurrentMedia(request: K, type: T, title: R): Promise<H>;
  abstract setVisibility(
    request: K,
    type: T,
    title: R,
    visibility: D,
  ): Promise<H>;
  abstract setAccessMedia(request: K, type: T, title: R, access: D): Promise<H>;
  abstract deleteCurrentMedia(request: K, type: T, title: R): Promise<H>;
}
