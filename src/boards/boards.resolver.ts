import { HttpException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { AccessGuard } from '../media/access.guard';
import { VisibilityGuard } from '../media/visibility.guard';
import { AuthGuard } from '../auth/auth.guard';
import CreateBoardDTO from '../dto/board.dto';
import { BoardEntity } from '../entities/board.entity';
import { BoardsService } from './boards.service';

@UseGuards(AuthGuard, VisibilityGuard, AccessGuard)
@Resolver(() => BoardEntity)
export class BoardsResolver {
  constructor(private boardsService: BoardsService) {}

  @Query(() => [BoardEntity], { name: 'getAllBoards' })
  async getAllBoards() {
    try {
      return this.boardsService.getAllBoards();
    } catch (e) {
      console.log(e);
    }
  }

  @Query(() => BoardEntity, { name: 'getCurrentBoard' })
  async getCurrentBoard(@Args('title') title: string) {
    try {
      return this.boardsService.getCurrentBoard(title);
    } catch (e) {
      console.log(e);
    }
  }

  // @Mutation((returns) => BoardEntity, { name: 'createNewBoard' })
  // async createNewBoard(@Args({ name: 'dto' }) dto: CreateBoardDTO<string>) {
  //   try {
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // @Mutation(() => BoardEntity, { name: 'updateCurrentBoard' })
  // async updateCurrentBoard(
  //   @Args({ name: 'id', type: () => Int }) id: number,
  //   @Args({ name: 'dto' }) dto: CreateBoardDTO<string>,
  // ) {
  //   try {
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // @Mutation(() => BoardEntity, { name: 'deleteCurrentBoard' })
  // async deleteCurrentBoard(@Args('id') id: number) {
  //   try {
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
}
