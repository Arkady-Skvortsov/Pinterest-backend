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
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import CreateCommentDTO from '../dto/comment.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CommentsPipe } from './comments.pipe';
import { CommentsService } from './comments.service';
import { CacheInterceptor } from '../redis/cache.interceptor';
import { AccessGuard } from '../media/access.guard';
import { VisibilityGuard } from '../media/visibility.guard';
import CommentEntity from '../entities/comment.entity';
import { UsersGuard } from '../users/users.guard';
import { RequestCustom } from '../interfaces/auth.interface';
import IComments from '../interfaces/comments.interfaces';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Comments')
@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard, AccessGuard, VisibilityGuard)
@Controller('comments')
export class CommentsController implements IComments {
  constructor(private commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Get all comments under current pin by his title' })
  @ApiResponse({ type: () => CommentEntity, status: 200 })
  @Get('/:pinTitle')
  async getAllComments(@Param('pinTitle') pinTitle: string) {
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
    request: RequestCustom,
    @Param('pinTitle') pinTitle: string,
    @Param('id') id: number,
  ) {
    try {
      return this.commentsService.getCurrentComment(id, pinTitle, request.user);
    } catch (e) {
      throw new HttpException(
        `Не удалось взять комментарий "${id}" под пином "${pinTitle}"`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Create new comment' })
  @ApiResponse({ status: 201, type: () => CommentEntity })
  @UseGuards(UsersGuard)
  @UsePipes(CommentsPipe)
  @UseInterceptors(FileInterceptor('photos'))
  @Post('/create/:pin')
  async createNewComment(
    @Request() request: RequestCustom,
    @Param('pin') title: string,
    @Body() dto: CreateCommentDTO,
    @UploadedFiles() photos: Express.Multer.File[],
  ) {
    try {
      return this.commentsService.createNewCommentUnderPin(
        request.user,
        title,
        dto,
        photos,
      );
    } catch (e) {
      throw new HttpException(
        `Не удалось создать комментарий под пином "${title}"`,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Like current comment under current pin' })
  @ApiResponse({ type: () => CommentEntity, status: 201 })
  @UseGuards(UsersGuard)
  @Post('/like/:pinTitle/:id')
  async likeCurrentComment(
    @Req() request: RequestCustom,
    @Param('pinTitle') pinTitle: string,
    @Param('id') id: number,
  ) {
    try {
      return this.commentsService.likeCurrentComment(
        request.user,
        pinTitle,
        id,
      );
    } catch (e) {
      throw new HttpException(
        `Не удалось лайкнуть комментарий "${id}" под пином "${pinTitle}"`,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Create comment' })
  @ApiResponse({ status: 201, type: () => CommentEntity })
  @UseGuards(UsersGuard)
  @UsePipes(CommentsPipe)
  @UseInterceptors(FileInterceptor('photos'))
  @Post('/currnet/:pinTitle/:id')
  async replyCurrentComment(
    @Request() request: RequestCustom,
    @Param('pinTitle') pinTitle: string,
    @Param('id') id: number,
    @Body() dto: CreateCommentDTO,
    @UploadedFiles() photos: Express.Multer.File[],
  ) {
    try {
      return this.commentsService.replyToCurrentComment(
        request.user,
        pinTitle,
        id,
        dto,
        photos,
      );
    } catch (e) {
      throw new HttpException(
        `Не удалось ответить на комментарий "${id}" под пином "${pinTitle}"`,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Update current comment under current pin' })
  @ApiResponse({ status: 203, type: () => CommentEntity })
  @Put('/current/:pinTitle/:id')
  async updateCurrentComment(
    @Request() request: RequestCustom,
    @Param('pinTitle') pinTitle: string,
    @Param('id') id: number,
    @Body() dto: CreateCommentDTO,
  ) {
    try {
      return this.commentsService.updateCurrentComment(
        request.user,
        pinTitle,
        id,
        dto,
      );
    } catch (e) {
      throw new HttpException(
        `Не удалось обновить "${id}" комментарий под пином "${pinTitle}"`,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Delete a current comment under current pin' })
  @ApiResponse({ status: 204, type: Number })
  @Delete('/current/:pinTitle/:id')
  async deleteCurrentComment(
    @Request() request: RequestCustom,
    @Param('pinTitle') pinTitle: string,
    @Param('id') id: number,
  ): Promise<string> {
    try {
      return this.commentsService.deleteCurrentComment(
        request.user,
        pinTitle,
        id,
      );
    } catch (e) {
      throw new HttpException(
        `Не удалось удалить "${id}" комментарий под пином "${pinTitle}"`,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
