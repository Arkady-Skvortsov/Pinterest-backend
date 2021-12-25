import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateBoardDTO from '../dto/board.dto';
import { UsersService } from '../users/users.service';
import { BoardEntity } from '../entities/board.entity';
import UserEntity from '../entities/users.entity';
import { HistoryService } from '../history/history.service';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity) private boardEntity: Repository<BoardEntity>,
    private usersService: UsersService,
    private historyService: HistoryService,
  ) {}

  async getAllBoards(): Promise<BoardEntity[]> {
    const boards = await this.boardEntity.find();

    return boards;
  }

  async getCurrentBoard(
    title: string,
    author?: UserEntity,
  ): Promise<BoardEntity> {
    const currentUser = await this.usersService.getCurrentUserByParam(title);
    let board;

    if (author)
      board = await this.boardEntity.findOne({ where: { title, author } });

    board = await this.boardEntity.findOne({ where: { title } });

    await this.historyService.createNewHistory(currentUser, board);

    return board;
  }

  async createNewBoard(
    user: UserEntity,
    dto: CreateBoardDTO,
    photo: Express.Multer.File,
  ): Promise<any> {
    // const newBoard = await this.boardEntity.create({
    //   ...dto,
    //   author: user,
    //   photo: dto.photo.buffer.toString(),
    //   notes: [],
    // });

    // await this.boardEntity.save(newBoard);

    // user.boards.push(newBoard);

    // return newBoard;

    return 'F';
  }

  async updateCurrentBoard(
    user: UserEntity,
    title: string,
    dto: CreateBoardDTO,
    photo: Express.Multer.File,
  ): Promise<BoardEntity> {
    const board = await this.getCurrentBoard(title);

    let currentBoard;

    user.boards.find((b) => {
      if (b.title === board.title && b.author === user) {
        currentBoard = b;
      }
    });

    // await this.boardEntity.update(currentBoard, {
    //   ...dto,
    // });

    return board;
  }

  async addCurrentBoard(user: UserEntity, title: string, choose?: string) {
    const currentBoard = await this.getCurrentBoard(title);
    let newBoard;

    if (choose) {
      newBoard = user.boards
        .filter((board) => board.title === choose)
        .push(currentBoard);
    }

    newBoard = user.boards
      .filter((board) => board.title === choose)
      .push(currentBoard);

    return newBoard;
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
      .find((b) => {
        if (b.title === board.title && b.author === user) {
          currentBoard = b;
        }
      });

    await this.boardEntity.delete(board);

    return currentBoard.title;
  }
}
