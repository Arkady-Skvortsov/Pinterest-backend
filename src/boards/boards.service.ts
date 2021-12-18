import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateBoardDTO from '../dto/board.dto';
import { BoardEntity } from '../entities/board.entity';
import UserEntity from '../entities/users.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity) private boardEntity: Repository<BoardEntity>,
  ) {}

  async getAllBoards(): Promise<BoardEntity[]> {
    const boards = await this.boardEntity.find();

    return boards;
  }

  async getCurrentBoard(title: string): Promise<BoardEntity> {
    const board = await this.boardEntity.findOne({ where: { title } });

    return board;
  }

  async createNewBoard(
    user: UserEntity,
    dto: CreateBoardDTO<string>,
  ): Promise<any> {
    let newBoard;

    // const newBoard = await this.boardEntity.create({
    //   ...dto,
    //   author: user,
    //   photo: dto.photo.buffer.toString(),
    // });

    // await this.boardEntity.save(newBoard);

    //await this.userService.updateCurrentUser(user.id, { boards: [newBoard] });

    // user.boards.push(newBoard);

    return newBoard;
  }

  async updateCurrentBoard(
    user: UserEntity,
    title: string,
    dto: CreateBoardDTO<string>,
  ): Promise<BoardEntity> {
    const board = await this.getCurrentBoard(title);

    let currentBoard;

    user.boards
      .filter((b) => {
        if (b.title === board.title && b.author === user) {
          currentBoard = b;
        }
      })
      .pop();

    // await this.boardEntity.update(currentBoard, {
    //   ...dto,
    //   author: user,
    //   photo: dto.photo.buffer.toString(),
    // });

    return board;
  }

  async changeVisibility(
    user: UserEntity,
    title: string,
    visibility: boolean,
  ): Promise<BoardEntity> {
    const board = await this.getCurrentBoard(title);

    let currentBoard;

    user.boards //Todo: refactoring code, remove that parts
      .filter((b) => {
        if (b.title === board.title && b.author !== user) {
          currentBoard = b;
        }
      })
      .pop();

    await this.boardEntity.update(board, { visibility });

    return currentBoard;
  }

  async deleteCurrentBoard(user: UserEntity, title: string): Promise<string> {
    const board = await this.getCurrentBoard(title);

    let currentBoard;

    user.boards //Todo: refactoring code, remove that parts
      .filter((b) => {
        if (b.title === board.title && b.author === user) {
          currentBoard = b;
        }
      })
      .pop();

    await this.boardEntity.delete(board);

    return currentBoard.title;
  }
}
