import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { CacheInterceptor } from '../redis/cache.interceptor';
import CommentEntity from '../entities/comment.entity';
import { AuthGuard } from '../auth/auth.guard';
import { AccessGuard } from '../media/access.guard';
import { VisibilityGuard } from '../media/visibility.guard';
import { CommentsService } from './comments.service';
import { GraphqlExceptionFilter } from '../graphql/graphql.filter';

@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard, AccessGuard, VisibilityGuard)
@UseFilters(GraphqlExceptionFilter)
@Resolver(() => CommentEntity)
export class CommentsResolver {
  constructor(private commentsService: CommentsService) {}
}
