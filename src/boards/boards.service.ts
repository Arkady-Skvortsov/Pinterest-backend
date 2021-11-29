import { JwtTokenService } from '@jwt-token/jwt-token.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '@users/users.service';
import CreateBoardDTO from 'src/dto/board.dto';
import { BoardEntity } from 'src/entities/board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity) private boardEntity: Repository<BoardEntity>,
    private usersService: UsersService,
    private jwtTokenService: JwtTokenService,
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
    token: string,
    dto: CreateBoardDTO<string>,
  ): Promise<BoardEntity> {
    const { user } = await this.jwtTokenService.findToken(token);

    const newBoard = await this.boardEntity.create({
      ...dto,
      author: user,
      photo: dto.photo.buffer.toString(),
    });

    //await this.userService.updateCurrentUser(user.id, { boards: [newBoard] });

    user.boards.push(newBoard);

    return newBoard;
  }

  async updateCurrentBoard(
    token: string,
    title: string,
    dto: CreateBoardDTO<string>,
  ): Promise<BoardEntity> {
    const { user } = await this.jwtTokenService.findToken(token);
    const board = await this.getCurrentBoard(title);

    let currentBoard;

    user.boards
      .filter((b) => {
        if (b.title === board.title && b.author === user) {
          currentBoard = b;
        }
      })
      .pop();

    await this.boardEntity.update(currentBoard, {
      ...dto,
      author: user,
      photo: dto.photo.buffer.toString(),
    });

    return board;
  }

  async deleteCurrentBoard(token: string, title: string): Promise<string> {
    const { user } = await this.jwtTokenService.findToken(token);
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
