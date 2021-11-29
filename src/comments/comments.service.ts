import { JwtTokenService } from '@jwt-token/jwt-token.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PinsService } from '@pins/pins.service';
import { UsersService } from '@users/users.service';
import CreateCommentDTO from 'src/dto/comment.dto';
import CommentEntity from 'src/entities/comment.entity';
import PinEntity from 'src/entities/pin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    private usersService: UsersService,
    private jwtTokenService: JwtTokenService,
    private pinsService: PinsService,
    @InjectRepository(PinEntity) private pinEntity: Repository<PinEntity>,
    @InjectRepository(CommentEntity)
    private commentEntity: Repository<CommentEntity>,
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

    return currentComment;
  }

  async createNewCommentUnderPin(
    token: string,
    title: string,
    dto: CreateCommentDTO<string>,
  ): Promise<CommentEntity> {
    const { user } = await this.jwtTokenService.findToken(token);
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
    token: string,
    title: string,
    id: number,
    dto: CreateCommentDTO<string>,
  ): Promise<CommentEntity> {
    const { user } = await this.jwtTokenService.findToken(token);
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
    token: string,
    title: string,
    id: number,
    dto: CreateCommentDTO<string>,
  ) {
    const { user } = await this.jwtTokenService.findToken(token);
    const pin = await this.pinsService.getCurrentPin(title);
    const currentComment = pin.comments
      .filter(
        (comment) =>
          comment.id === id && comment.author.username !== user.username,
      )
      .pop();

    const comment = await this.createNewComment(token, title, dto);

    currentComment.replies.push(comment);

    await this.commentEntity;
  }

  async likeCurrentComment(token: string, title: string, id: number) {
    const { user } = await this.jwtTokenService.findToken(token);
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
    token: string,
    title: string,
    id: number,
  ): Promise<string> {
    const { user } = await this.jwtTokenService.findToken(token);
    const pin = await this.pinsService.getCurrentPin(title);
    const currentComment = pin.comments
      .filter((p) => p.id === id && p.author.username === user.username)
      .pop();

    await this.commentEntity.delete(currentComment);

    return `Вы удалили комментарий ${currentComment.text} под пином ${pin.title}`;
  }

  private async createNewComment(
    token: string,
    title: string,
    dto: CreateCommentDTO<string>,
  ) {
    const { user } = await this.jwtTokenService.findToken(token);
    const pin = await this.pinsService.getCurrentPin(title);

    const newComment = await this.commentEntity.create({
      ...dto,
      author: user,
      pin,
    });

    return newComment;
  }
}
