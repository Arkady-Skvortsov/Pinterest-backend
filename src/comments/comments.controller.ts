import { AuthGuard } from '@auth/auth.guard';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  ParseArrayPipe,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import CreateCommentDTO from 'src/dto/comment.dto';
import { CommentsPipe } from './comments.pipe';
import { CommentsService } from './comments.service';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Create new comment' })
  @ApiResponse({ status: 201, type: Object })
  @UseGuards(AuthGuard)
  @UsePipes(CommentsPipe)
  @Post('/create/:pin')
  async createNewComment(
    @Param('pin') title: string,
    @Body() dto: CreateCommentDTO<string>,
  ) {
    try {
      console.log('F');
    } catch (e) {
      throw new HttpException(
        'Не удалось создать комментарий',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
