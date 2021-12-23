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
    const allNotes = user.boards.find(
      (board) => board.title === title && board.author === user,
    ).notes;

    return allNotes;
  }

  async getCurrentNote(
    user: UserEntity,
    title: string,
    id: number,
  ): Promise<NotesEntity> {
    const currentNote = user.boards
      .find((board) => board.title === title && board.author === user)
      .notes.find((note) => note.id === id);

    return currentNote;
  }

  async updateCurrentNote(
    user: UserEntity,
    title: string,
    id: number,
    dto: CreateNotesDTO<string>,
    photos?: Express.Multer.File[],
  ) {
    const currentNote = await this.getCurrentNote(user, title, id);
    const currentBoard = await this.boardsService.getCurrentBoard(title, user);

    await this.notesEntity.update(currentNote, {
      ...dto,
      photos: photos.map((photo) => photo.buffer.toString()),
      board: currentBoard,
    });

    return currentNote;
  }

  async createNewNote(
    user: UserEntity,
    title: string,
    dto: CreateNotesDTO<string>,
    photos?: Express.Multer.File[],
  ): Promise<NotesEntity> {
    const board = await this.boardsService.getCurrentBoard(title, user);

    const newNote = await this.notesEntity.create({
      ...dto,
      photos: photos.map((photo) => photo.buffer.toString()),
      board,
    });

    await this.notesEntity.save(newNote);

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
