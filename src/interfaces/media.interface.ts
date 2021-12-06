import { gMedia, mediaDTO, mediaEntity } from '../dto/media.dto';

export abstract class IMediaService<
  T = gMedia,
  R = string,
  C = mediaDTO,
  H = mediaEntity,
  D = boolean,
> {
  abstract getAllMedia(type: T): Promise<H[]>;
  abstract getCurrentMedia(type: T, title: R): Promise<H>;
  abstract createNewMedia(type: T, dto: C): Promise<H>;
  abstract updateCurrentMedia(type: T, title: R, dto: C): Promise<H>;
  abstract addCurrentMedia(type: T, title: R, board: R): Promise<H>;
  abstract likeCurrentMedia(type: T, title: R): Promise<H>;
  abstract setVisibility(type: T, title: R, visibility: D): Promise<H>;
  abstract setAccessMedia(type: T, title: R, access: D): Promise<H>;
  abstract deleteCurrentMedia(type: T, title: R): Promise<H>;
}
