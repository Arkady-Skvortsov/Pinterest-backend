import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as path from 'path';
import { Readable } from 'stream';
import {
  mockUsers,
  mockPhotos,
  mockPins,
  mockBoards,
  mockNotes,
} from '../../test/data/mock-data';
import CreateBoardDTO from '../dto/board.dto';
import CreateNotesDTO from '../dto/notes.dto';
import { BoardsService } from '../boards/boards.service';
import { BoardEntity } from '../entities/board.entity';
import NotesEntity from '../entities/notes.entity';
import UserEntity from '../entities/users.entity';
import { UsersService } from '../users/users.service';
import { NotesService } from './notes.service';
import CreateRoleDTO from '../dto/role.dto';

describe('NotesService', () => {
  let service: NotesService;

  const mockBoardsService = {
    getCurrentBoards: jest
      .fn()
      .mockImplementation((title: string): CreateBoardDTO => {
        return mockBoards.find((board) => board.title === title);
      }),
  };

  const mockUsersService = {
    getCurrentUser: jest.fn().mockImplementation(),
  };

  const mockNotesRepository = {
    find: jest.fn().mockReturnValueOnce(() => mockNotes),
    findOne: jest.fn().mockImplementation((title: string) => {
      const currentNote = mockNotes.find((note) => note.title === title);

      return currentNote;
    }),
    create: jest.fn().mockImplementation((dto: CreateNotesDTO<string>) => {
      const newNote = dto;

      mockNotes.push(newNote);

      return newNote;
    }),
    update: jest
      .fn()
      .mockImplementation((title: string, dto: CreateNotesDTO<string>) => {
        let currentNote = mockNotes.find((note) => note.title === title);

        currentNote = dto;

        return currentNote;
      }),
    delete: jest.fn().mockImplementation((title: string) => {
      const currentNote = mockNotes.find((note) => note.title === title);

      mockNotes.splice(currentNote.id, mockNotes.length - currentNote.id);

      return currentNote.id;
    }),
    save: jest.fn().mockRejectedValue((note: CreateNotesDTO<string>) => note),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        {
          provide: JwtService,
          useValue: {},
        },
        { provide: UsersService, useValue: mockUsersService },
        { provide: BoardsService, useValue: mockBoardsService },
        {
          provide: getRepositoryToken(NotesEntity),
          useValue: mockNotesRepository,
        },
        { provide: getRepositoryToken(UserEntity), useValue: {} },
        {
          provide: getRepositoryToken(BoardEntity),
          useValue: {},
        },
        {
          provide: BoardsService,
          useValue: mockBoardsService,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be get all notes from current board by her title', async () => {
    try {
      const currentBoard = mockBoardsService.getCurrentBoards('TLOU2');
      const allNotes = await service.getAllNotes(
        currentBoard.author,
        'Arkadiy',
      );

      expect(mockBoardsService.getCurrentBoards('TLOU2')).resolves.toEqual({
        ...currentBoard,
      });
      expect(
        await service.getAllNotes(currentBoard.author, 'F'),
      ).resolves.toEqual({ ...allNotes });

      expect(mockNotesRepository.find).toHaveBeenCalledTimes(1);
    } catch (e) {
      console.log(e);
    }
  });

  it('should be get current note by id from board by her title', async () => {
    try {
      const currentBoard = mockBoardsService.getCurrentBoards('TLOU2');
      const currentNote = await service.getCurrentNote(
        currentBoard.author,
        currentBoard.title,
        1,
      );

      expect(mockBoardsService.getCurrentBoards('TLOU2')).resolves.toEqual({
        ...currentBoard,
      });
      expect(
        await service.getCurrentNote(
          currentBoard.author,
          currentBoard.title,
          1,
        ),
      ).resolves.toEqual({ ...currentNote });

      expect(mockNotesRepository.findOne).toHaveBeenCalledWith(
        currentBoard.title,
      );

      expect(mockNotesRepository.findOne).toHaveBeenCalledTimes(1);
    } catch (e) {
      console.log(e);
    }
  });

  it('should be create new notes under current board', async () => {
    try {
      const currentBoard = mockBoardsService.getCurrentBoards('TLOU2');

      const newNote: CreateNotesDTO<string> = {
        title: 'Upgrade weapons in game',
        text: 'I need to upgrade a machette',
        board: currentBoard,
        status: 'In progress',
      };

      mockNotes.push(newNote);

      expect(
        await mockBoardsService.getCurrentBoards('TLOU2'),
      ).resolves.toEqual({ ...mockBoards[0] });
      expect(
        await service.createNewNote(
          currentBoard.author,
          currentBoard.title,
          newNote,
        ),
      );
      expect(mockNotes[2]).resolves.toEqual(newNote);

      expect(mockNotesRepository.create).toHaveBeenCalledWith(newNote);
      expect(mockNotesRepository.save).toHaveBeenCalledWith(newNote);

      expect(mockNotesRepository.create).toHaveBeenCalledTimes(1);
      expect(mockNotesRepository.save).toHaveBeenCalledTimes(1);
    } catch (e) {
      console.log(e);
    }
  });

  it('should be set status to the current note under current board', async () => {
    try {
      const currentBoard = mockBoardsService.getCurrentBoards('TLOU2');
      const currentNote = await service.getCurrentNote(
        currentBoard.author,
        currentBoard.title,
        1,
      );

      expect(mockBoardsService.getCurrentBoards('TLOU2')).resolves.toEqual(
        currentBoard,
      );
      expect(
        await service.getCurrentNote(
          currentBoard.author,
          currentBoard.title,
          1,
        ),
      ).resolves.toEqual({ ...currentNote });

      expect(mockNotesRepository.findOne).toHaveBeenCalledWith('TLOU2');
      expect(mockNotesRepository.update).toHaveBeenCalledWith({
        status: 'Done',
      });

      expect(mockNotesRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockNotesRepository.update).toHaveBeenCalledTimes(1);
    } catch (e) {
      console.log(e);
    }
  });

  it('should be update current note by id under current board', async () => {
    try {
      const currentBoard = mockBoardsService.getCurrentBoards('TLOU2');
      const currentNote = await service.getCurrentNote(
        currentBoard.author,
        currentBoard.title,
        1,
      );

      const updatedNote: CreateNotesDTO<string> = {
        id: 1,
        title: currentBoard.title,
        text: 'I need to do something...',
        board: currentBoard,
        status: 'In progress',
      };

      expect(mockBoardsService.getCurrentBoards('TLOU2')).resolves.toEqual({
        ...currentBoard,
      });
      expect(
        await service.getCurrentNote(
          currentBoard.author,
          currentBoard.title,
          1,
        ),
      ).resolves.toEqual({ ...currentNote });
      expect(
        await service.updateCurrentNote(
          currentBoard.author,
          currentBoard.title,
          1,
          updatedNote,
        ),
      ).resolves.toEqual({ ...updatedNote });

      expect(mockNotesRepository.findOne).toHaveBeenCalledWith(1);
      expect(mockNotesRepository.update).toHaveBeenCalledWith(updatedNote);

      expect(mockNotesRepository.findOne).toHaveBeenCalledWith(1);
      expect(mockNotesRepository.update).toHaveBeenCalledWith(1);
    } catch (e) {
      console.log(e);
    }
  });

  it('should be delete current note by id under current note', async () => {
    try {
      const currentBoard = mockBoardsService.getCurrentBoards('TLOU2');
      const currentNote = await service.getCurrentNote(
        currentBoard.author,
        currentBoard.title,
        1,
      );

      expect(mockBoardsService.getCurrentBoards('TLOU2')).resolves.toEqual({
        ...currentBoard,
      });
      expect(
        await service.getCurrentNote(
          currentBoard.author,
          currentBoard.title,
          1,
        ),
      ).resolves.toEqual({ ...currentNote });
      expect(
        await service.deleteCurrentNote(
          currentBoard.author,
          currentBoard.title,
          1,
        ),
      ).resolves.toEqual(1);

      expect(mockNotesRepository.findOne).toHaveBeenCalledWith(currentNote.id);
      expect(mockNotesRepository.delete).toHaveBeenCalledWith(currentNote.id);

      expect(mockNotesRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockNotesRepository.delete).toHaveBeenCalledTimes(1);
    } catch (e) {
      console.log(e);
    }
  });
});
