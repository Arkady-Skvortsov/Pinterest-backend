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

  async getCurrentComment(id: number, title: string): Promise<CommentEntity> {
    const { comments } = await this.pinsService.getCurrentPin(title);

    const currentComment = comments.find((comment) => comment.id === id);

    return currentComment;
  }

  async createNewCommentUnderPin(
    user: UserEntity,
    title: string,
    dto: CreateCommentDTO<string>,
    photos: Express.Multer.File[],
  ): Promise<CommentEntity> {
    const pin = await this.pinsService.getCurrentPin(title);

    const newComment = await this.commentEntity.create({
      ...dto,
      pin,
      author: user,
    });

    await this.commentEntity.save(newComment);

    await this.pinEntity.update(pin, { comments: [newComment] });

    return newComment;
  }

  async updateCurrentComment(
    user: UserEntity,
    title: string,
    id: number,
    dto: CreateCommentDTO<string>,
    photos?: Express.Multer.File[],
  ): Promise<CommentEntity> {
    const pin = await this.pinsService.getCurrentPin(title);

    const currentComment = pin.comments
      .filter((p) => p.id === id && p.author.username === user.username)
      .pop();

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
    dto: CreateCommentDTO<string>,
    photos: Express.Multer.File[],
  ): Promise<CommentEntity> {
    const pin = await this.pinsService.getCurrentPin(title);

    const currentComment = pin.comments
      .filter(
        (comment) =>
          comment.id === id && comment.author.username !== user.username,
      )
      .pop();

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

    const currentComment = pin.comments
      .filter(
        (comment) =>
          comment.id === id && comment.author.username !== user.username,
      )
      .pop();

    let i = 0;
    currentComment.like++;

    await this.commentEntity.update(currentComment, { like: i++ });

    return `???? ???????????????? ?????????????????????? ?????? ?????????? ${currentComment.pin} ???????????? ${currentComment.author}`;
  }

  async deleteCurrentComment(
    user: UserEntity,
    title: string,
    id: number,
  ): Promise<string> {
    const pin = await this.pinsService.getCurrentPin(title);

    const currentComment = pin.comments
      .filter((p) => p.id === id && p.author.username === user.username)
      .pop();

    await this.commentEntity.delete(currentComment);

    return `???? ?????????????? ?????????????????????? ${currentComment.text} ?????? ?????????? ${pin.title}`;
  }

  private async createNewComment(
    user: UserEntity,
    title: string,
    dto: CreateCommentDTO<string>,
  ): Promise<CommentEntity> {
    const pin = await this.pinsService.getCurrentPin(title);

    const newComment: CommentEntity = await this.commentEntity.create({
      ...dto,
      author: user,
      pin,
    });

    //this.careTaker.addMemento(this.originator.setState(newComment));

    return newComment;
  }
}
