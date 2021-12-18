import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import CreateNotesDTO from '../dto/notes.dto';
import NotesEntity from '../entities/notes.entity';
import { BoardsService } from '../boards/boards.service';
import UserEntity from '../entities/users.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NotesEntity) private notesEntity: Repository<NotesEntity>,
    private jwtTokenService: JwtTokenService,
    private boardsService: BoardsService,
  ) {}

  async getAllNotes(user: UserEntity, title: string): Promise<NotesEntity[]> {
    let currentBoard;

    user.boards
      .filter((board) => {
        if (board.title === title && board.author === user)
          currentBoard = board;
      })
      .pop();

    return currentBoard.notes;
  }

  async getCurrentNote(
    user: UserEntity,
    title: string,
    id: number,
  ): Promise<NotesEntity> {
    let currentBoard;

    user.boards
      .filter((board) => {
        if (board.title === title && board.author === user)
          currentBoard = board;
      })
      .pop();

    const currentNote = currentBoard.notes[id + 1];

    return currentNote;
  }

  async updateCurrentNote(
    user: UserEntity,
    title: string,
    id: number,
    dto: CreateNotesDTO<string>,
  ) {
    let currentBoard;

    user.boards
      .filter((board) => {
        if (board.title === title && board.author === user)
          currentBoard = board;
      })
      .pop();

    const currentNote = currentBoard.notes[id + 1];

    await this.notesEntity.update(currentNote, { ...dto, board: currentBoard });

    return currentNote;
  }

  async createNewNote(
    user: UserEntity,
    title: string,
    dto: CreateNotesDTO<string>,
  ): Promise<NotesEntity> {
    const Board = await this.boardsService.getCurrentBoard(title);
    let currentBoard;

    user.boards
      .filter((board) => {
        if (board.title === Board.title && board.author === user)
          currentBoard = board;
      })
      .pop();

    const newNote = await this.notesEntity.create({
      ...dto,
      board: currentBoard,
    });

    await this.notesEntity.save(newNote);

    Board.notes.push(newNote);

    // await this.boardsService.updateCurrentBoard(token, title, {
    //   notes: [newNote],
    // }); Todo: Fix it later....

    return newNote;
  }

  async deleteCurrentNote(
    user: UserEntity,
    title: string,
    id: number,
  ): Promise<number> {
    const note = await this.getCurrentNote(user, title, id);

    await this.notesEntity.delete(note);

    return note.id;
  }
}
