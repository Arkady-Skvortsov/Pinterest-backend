import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import CreateNotesDTO from '../dto/notes.dto';
import NotesEntity from '../entities/notes.entity';
import { BoardsService } from '../boards/boards.service';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NotesEntity) private notesEntity: Repository<NotesEntity>,
    private jwtTokenService: JwtTokenService,
    private boardsService: BoardsService,
  ) {}

  async getAllNotes(token: string, title: string) {
    const { user } = await this.jwtTokenService.findToken(token);
    let currentBoard;

    user.boards
      .filter((board) => {
        if (board.title === title && board.author === user)
          currentBoard = board;
      })
      .pop();

    return currentBoard.notes;
  }

  async getCurrentNote(token: string, title: string, id: number) {
    const { user } = await this.jwtTokenService.findToken(token);
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
    token: string,
    title: string,
    id: number,
    dto: CreateNotesDTO<string>,
  ) {
    const { user } = await this.jwtTokenService.findToken(token);
    let currentBoard;

    user.boards
      .filter((board) => {
        if (board.title === title && board.author === user)
          currentBoard = board;
      })
      .pop();

    const currentNote = currentBoard.notes[id + 1];

    await this.notesEntity.update(currentNote, { ...dto });

    return currentNote;
  }

  async createNewNote(
    token: string,
    title: string,
    dto: CreateNotesDTO<string>,
  ): Promise<NotesEntity> {
    const { user } = await this.jwtTokenService.findToken(token);
    const Board = await this.boardsService.getCurrentBoard(title);
    let currentBoard;

    user.boards
      .filter((board) => {
        if (board.title === Board.title && board.author === user)
          currentBoard = board;
      })
      .pop();

    const newNote = await this.notesEntity.create(dto);

    // Board.notes.push(newNote);

    // await this.boardsService.updateCurrentBoard(token, title, {});

    return newNote;
  }

  async deleteCurrentNote(
    token: string,
    title: string,
    id: number,
  ): Promise<number> {
    const note = await this.getCurrentNote(token, title, id);

    await this.notesEntity.delete(note);

    return note.id;
  }
}
