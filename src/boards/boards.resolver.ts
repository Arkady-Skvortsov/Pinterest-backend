import { Request, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { AccessGuard } from '../media/access.guard';
import { VisibilityGuard } from '../media/visibility.guard';
import { AuthGuard } from '../auth/auth.guard';
import CreateBoardDTO from '../dto/board.dto';
import { BoardEntity } from '../entities/board.entity';
import { BoardsService } from './boards.service';
import { UsersGuard } from '../users/users.guard';
import { RequestCustom } from '../interfaces/auth.interface';

@UseGuards(AuthGuard, VisibilityGuard, AccessGuard)
@Resolver(() => BoardEntity)
export class BoardsResolver {
  constructor(private boardsService: BoardsService) {}

  @Query(() => [BoardEntity], { name: 'getAllBoards' })
  async getAllBoards(@Request() request: RequestCustom) {
    try {
      return this.boardsService.getAllBoards();
    } catch (e) {
      console.log(e);
    }
  }

  @Query(() => BoardEntity, { name: 'getCurrentBoard' })
  async getCurrentBoard(
    @Request() request: RequestCustom,
    @Args('title') title: string,
  ) {
    try {
      return this.boardsService.getCurrentBoard(request.user, title);
    } catch (e) {
      console.log(e);
    }
  }

  @UseGuards(UsersGuard)
  @Mutation((returns) => BoardEntity, { name: 'createNewBoard' })
  async createNewBoard(
    @Request() request: RequestCustom,
    @Args({ name: 'dto' }) dto: CreateBoardDTO<string>,
  ) {
    try {
      return this.boardsService.createNewBoard(request.user, dto);
    } catch (e) {
      console.log(e);
    }
  }

  @UseGuards(UsersGuard)
  @Mutation(() => BoardEntity, { name: 'updateCurrentBoard' })
  async updateCurrentBoard(
    @Request() request: RequestCustom,
    @Args({ name: 'title', type: () => String }) title: string,
    @Args({ name: 'dto' }) dto: CreateBoardDTO<string>,
  ) {
    try {
      return this.boardsService.updateCurrentBoard(request.user, title, dto);
    } catch (e) {
      console.log(e);
    }
  }

  @Mutation(() => BoardEntity, { name: 'deleteCurrentBoard' })
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
