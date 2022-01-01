import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PinsService } from '../pins/pins.service';
import CreateCommentDTO from '../dto/comment.dto';
import CommentEntity from '../entities/comment.entity';
import PinEntity from '../entities/pin.entity';
import UserEntity from '../entities/users.entity';
import { HistoryService } from '../history/history.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(PinEntity) private pinEntity: Repository<PinEntity>,
    @InjectRepository(CommentEntity)
    private commentEntity: Repository<CommentEntity>,
    private pinsService: PinsService,
    private historyService: HistoryService,
  ) {}

  async getAllComments(title: string): Promise<CommentEntity[]> {
    const { comments } = await this.pinsService.getCurrentPin(title);

    return comments;
  }

  async getCurrentComment(
    id: number,
    title: string,
    user: UserEntity,
  ): Promise<CommentEntity> {
    const { comments } = await this.pinsService.getCurrentPin(title);
    let currentComment;

    if (user) currentComment = comments.find((comment) => comment.id === id);

    currentComment = comments.find(
      (comment) => comment.id === id && comment.author === user,
    );

    return currentComment;
  }

  async createNewCommentUnderPin(
    user: UserEntity,
    title: string,
    dto: CreateCommentDTO,
    photos?: Express.Multer.File[],
  ): Promise<CommentEntity> {
    const pin = await this.pinsService.getCurrentPin(title);

    const newComment = await this.commentEntity.create({
      ...dto,
      pin,
      author: user,
      photos: photos.map((photo) => photo.buffer.toString()),
    });

    await this.commentEntity.save(newComment);

    await this.pinEntity.update(pin, { comments: [newComment] });

    return newComment;
  }

  async updateCurrentComment(
    user: UserEntity,
    title: string,
    id: number,
    dto: CreateCommentDTO,
    photos?: Express.Multer.File[],
  ): Promise<CommentEntity> {
    const pin = await this.pinsService.getCurrentPin(title);

    const currentComment = await this.getCurrentComment(id, title, user);

    await this.commentEntity.update(currentComment.id, {
      ...dto,
      author: user,
      pin,
    });

    return currentComment;
  }

  async replyToCurrentComment(
    user: UserEntity,
    title: string,
    id: number,
    dto: CreateCommentDTO,
    photos: Express.Multer.File[],
  ): Promise<CommentEntity> {
    const pin = await this.pinsService.getCurrentPin(title);

    const currentComment = pin.comments.find(
      (comment) =>
        comment.id === id && comment.author.username !== user.username,
    );

    const comment = await this.createNewComment(user, title, dto);

    currentComment.replies.push(comment);

    await this.commentEntity.update(currentComment, { replies: [comment] });

    return comment;
  }

  async likeCurrentComment(
    user: UserEntity,
    title: string,
    id: number,
  ): Promise<string> {
    const pin = await this.pinsService.getCurrentPin(title);

    const currentComment = pin.comments.find(
      (comment) =>
        comment.id === id && comment.author.username !== user.username,
    );

    const like = currentComment.like++;

    await this.commentEntity.update(currentComment, { like });

    return `Вы лайкнули комментарий под пином ${currentComment.pin} автора ${currentComment.author}`;
  }

  async deleteCurrentComment(
    user: UserEntity,
    title: string,
    id: number,
  ): Promise<string> {
    const pin = await this.pinsService.getCurrentPin(title);

    const currentComment = await this.getCurrentComment(id, title, user);

    await this.commentEntity.delete(currentComment);

    return `Вы удалили комментарий ${currentComment.text} под пином ${pin.title}`;
  }

  private async createNewComment(
    user: UserEntity,
    title: string,
    dto: CreateCommentDTO,
  ): Promise<CommentEntity> {
    const pin = await this.pinsService.getCurrentPin(title);

    const newComment = await this.commentEntity.create({
      ...dto,
      author: user,
      pin,
    });

    return newComment;
  }
}
