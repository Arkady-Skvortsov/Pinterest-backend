import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PinsService } from '../pins/pins.service';
import { Caretaker, Originator } from '../history/history.service';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import { UsersService } from '../users/users.service';
import CreateCommentDTO from '../dto/comment.dto';
import CommentEntity from '../entities/comment.entity';
import PinEntity from '../entities/pin.entity';
import UserEntity from 'src/entities/users.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(PinEntity) private pinEntity: Repository<PinEntity>,
    @InjectRepository(CommentEntity)
    private commentEntity: Repository<CommentEntity>,
    private usersService: UsersService,
    private jwtTokenService: JwtTokenService,
    private pinsService: PinsService,
    private originator: Originator,
    private careTaker: Caretaker,
  ) {}

  async getAllComments(title: string): Promise<CommentEntity[]> {
    const { comments } = await this.pinsService.getCurrentPin(title);

    return comments;
  }

  async getCurrentComment(id: number, title: string): Promise<CommentEntity> {
    const { comments } = await this.pinsService.getCurrentPin(title);
    let currentComment;

    comments.forEach((comment) => {
      if (comment.id === id) currentComment = comment;
    });

    console.log();

    return currentComment;
  }

  async createNewCommentUnderPin(
    user: UserEntity,
    title: string,
    dto: CreateCommentDTO<string>,
  ): Promise<CommentEntity> {
    const pin = await this.pinsService.getCurrentPin(title);

    const newComment = await this.commentEntity.create({
      ...dto,
      pin,
      author: user,
    });

    await this.pinEntity.update(pin, { comments: [newComment] });

    return newComment;
  }

  async updateCurrentComment(
    user: UserEntity,
    title: string,
    id: number,
    dto: CreateCommentDTO<string>,
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

    return `Вы лайкнули комментарий под пином ${currentComment.pin} автора ${currentComment.author}`;
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

    return `Вы удалили комментарий ${currentComment.text} под пином ${pin.title}`;
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
