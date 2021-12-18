import { Request, UseFilters, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createReadStream } from 'fs';
import { AccessGuard } from '../media/access.guard';
import { VisibilityGuard } from '../media/visibility.guard';
import { AuthGuard } from '../auth/auth.guard';
import CreateBoardDTO from '../dto/board.dto';
import { BoardEntity } from '../entities/board.entity';
import { BoardsService } from './boards.service';
import { UsersGuard } from '../users/users.guard';
import { RequestCustom } from '../interfaces/auth.interface';
import { GraphqlExceptionFilter } from '../graphql/graphql.filter';

@UseGuards(AuthGuard, VisibilityGuard)
@UseFilters(GraphqlExceptionFilter)
@Resolver(() => BoardEntity)
export class BoardsResolver {
  constructor(private boardsService: BoardsService) {}

  @Query(() => [BoardEntity], { name: 'getAllBoards' })
  async getAllBoards() {
    return this.boardsService.getAllBoards();
  }

  @Query(() => BoardEntity, { name: 'getCurrentBoard' })
  async getCurrentBoard(@Args('title') title: string) {
    return this.boardsService.getCurrentBoard(title);
  }

  @Mutation((returns) => BoardEntity, { name: 'createNewBoard' })
  @UseGuards(UsersGuard)
  async createNewBoard(
    @Request() request: RequestCustom,
    @Args({ name: 'CreateBoardDTO' }) dto: CreateBoardDTO<string>,
    @Args({ name: 'file', type: () => GraphQLUpload }) { createReadStream },
  ) {
    return this.boardsService.createNewBoard(request.user, dto);
  }

  @Mutation(() => BoardEntity, { name: 'updateCurrentBoard' })
  @UseGuards(AccessGuard, UsersGuard)
  async updateCurrentBoard(
    @Request() request: RequestCustom,
    @Args({ name: 'title', type: () => String }) title: string,
    @Args({ name: 'CreateBoardDTO' }) dto: CreateBoardDTO<string>,
  ) {
    return this.boardsService.updateCurrentBoard(request.user, title, dto);
  }

  @Mutation(() => BoardEntity, { name: 'deleteCurrentBoard' })
  @UseGuards(AccessGuard, UsersGuard)
  async deleteCurrentBoard(
    @Request() request: RequestCustom,
    @Args({ name: 'title', type: () => String }) title: string,
  ) {
    try {
      return this.boardsService.deleteCurrentBoard(request.user, title);
    } catch (e) {
      console.log(e);
    }
  }
}
