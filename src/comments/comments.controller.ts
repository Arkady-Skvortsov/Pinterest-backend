import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import CreateCommentDTO from '../dto/comment.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CommentsPipe } from './comments.pipe';
import { CommentsService } from './comments.service';
import { CacheInterceptor } from '../redis/cache.interceptor';
import { AccessGuard } from '../media/access.guard';
import { VisibilityGuard } from '../media/visibility.guard';
import MessageEntity from '../entities/messages.entity';
import CommentEntity from '../entities/comment.entity';

@ApiTags('Comments')
@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard, AccessGuard, VisibilityGuard)
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Get all comments under current pin by his title' })
  @ApiResponse({ type: () => CommentEntity, status: 200 })
  @Get('/:pinTitle')
  async getAllComments(
    @Req() request: Request,
    @Param('pinTitle') pinTitle: string,
  ) {
    try {
      return this.commentsService.getAllComments(pinTitle);
    } catch (e) {
      throw new HttpException(
        `Не удалось взять все комментарии под "${pinTitle}" пином"`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Get current comment under current pin' })
  @ApiResponse({ status: 200, type: () => CommentEntity })
  @Get('/current/:pinTitle/:id')
  async getCurrentComment(
    @Req() request: Request,
    @Param('pinTitle') pinTitle: string,
    @Param('id') id: number,
  ) {
    try {
      return this.commentsService.getCurrentComment(id, pinTitle);
    } catch (e) {
      throw new HttpException(
        `Не удалось взять комментарий "${id}" под пином "${pinTitle}"`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Create new comment' })
  @ApiResponse({ status: 201, type: () => CommentEntity })
  @UsePipes(CommentsPipe)
  @Post('/create/:pin')
  async createNewComment(
    @Req() request: Request,
    @Param('pin') title: string,
    @Body() dto: CreateCommentDTO<string>,
  ) {
    try {
      return this.commentsService.createNewCommentUnderPin('', title, dto);
    } catch (e) {
      throw new HttpException(
        `Не удалось создать комментарий под пином "${title}"`,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Like current comment under current pin' })
  @ApiResponse({ type: CommentEntity, status: 201 })
  @Post('/like/:pinTitle/:id')
  async likeCurrentComment(
    @Req() request: Request,
    @Param('pinTitle') pinTitle: string,
    @Param('id') id: number,
  ) {
    try {
      return this.commentsService.likeCurrentComment('', pinTitle, id);
    } catch (e) {
      throw new HttpException(
        `Не удалось лайкнуть комментарий "${id}" под пином "${pinTitle}"`,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Create comment' })
  @ApiResponse({ status: 201, type: () => MessageEntity })
  @Post('/currnet/:pinTitle/:id')
  async replyCurrentComment(
    @Req() request: Request,
    @Param('pinTitle') pinTitle: string,
    @Param('id') id: number,
    @Body() dto: CreateCommentDTO<string>,
  ) {
    try {
      return this.commentsService.replyToCurrentComment('', pinTitle, id, dto);
    } catch (e) {
      throw new HttpException(
        `Не удалось ответить на комментарий "${id}" под пином "${pinTitle}"`,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Put('/current/:pinTitle/:id')
  async updateCurrentComment(
    @Req() request: Request,
    @Param('pinTitle') pinTitle: string,
    @Param('id') id: number,
    @Body() dto: CreateCommentDTO<string>,
  ) {
    try {
      return this.commentsService.updateCurrentComment('', pinTitle, id, dto);
    } catch (e) {
      throw new HttpException(
        `Не удалось обновить "${id}" комментарий под пином "${pinTitle}"`,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Delete('/current/:pinTitle/:id')
  async deleteCurrentComment(
    @Req() request: Request,
    @Param('pinTitle') pinTitle: string,
    @Param('id') id: number,
  ) {
    try {
      return this.commentsService.deleteCurrentComment('', pinTitle, id);
    } catch (e) {
      throw new HttpException(
        `Не удалось удалить "${id}" комментарий под пином "${pinTitle}"`,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
