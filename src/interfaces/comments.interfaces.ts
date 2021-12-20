import CreateCommentDTO from 'src/dto/comment.dto';
import CommentEntity from '../entities/comment.entity';
import { RequestCustom } from './auth.interface';

export default abstract class IComments<
  T = CommentEntity,
  R = number,
  H = CreateCommentDTO<string>,
  C = string,
  K = RequestCustom,
  E = Express.Multer.File,
> {
  abstract getAllComments(title: C): Promise<T[]>;
  abstract getCurrentComment(title: C, id: R): Promise<T>;
  abstract createNewComment(
    request: K,
    title: C,
    dto: H,
    photos: E[],
  ): Promise<T>;
  abstract updateCurrentComment(
    request: K,
    title: C,
    id: R,
    dto: H,
    photos: E[],
  ): Promise<T>;
  abstract deleteCurrentComment(request: K, title: C, id: R): Promise<C>;
}
