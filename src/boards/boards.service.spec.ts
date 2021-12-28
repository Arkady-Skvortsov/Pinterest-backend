import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Readable } from 'stream';
import * as path from 'path';
import { BoardEntity } from '../entities/board.entity';
import UserEntity from '../entities/users.entity';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import { UsersService } from '../users/users.service';
import { BoardsService } from './boards.service';
import CreateBoardDTO from '../dto/board.dto';
import { PinsService } from '../pins/pins.service';
import CreateUserDTO from '../dto/users.dto';
import { HistoryService } from '../history/history.service';
import { NotificationService } from '../notification/notification.service';
import HistoryEntity from '../entities/history.entity';
import NotificationEntity from '../entities/notification.entity';
import CreateNotificationDTO, { subscriber } from '../dto/notification.dto';
import CreateHistoryDTO from '../dto/history.dto';
import CreateRoleDTO from '../dto/role.dto';

describe('BoardsService', () => {
  let service: BoardsService;

  const mockRoles: CreateRoleDTO[] = [
    { id: 1, title: 'admin', description: 'You can ban a current user' },
    {
      id: 2,
      title: 'user',
      description:
        'You can do something interesting in the applciation: like boards/pins, create you"r own things',
    },
  ];

  const mockUsers: CreateUserDTO[] = [
    {
      id: 1,
      username: 'Arkadiy228',
      firstname: 'Arkasha',
      lastname: 'Skvortsovvvv',
      password: 'somePassword123',
      email: 'some@mail.ru',
      role: mockRoles[0],
    },
    {
      id: 2,
      username: 'Children123',
      firstname: 'little',
      lastname: 'children',
      password: 'childhood228',
      email: 'child.little@mail.ru',
      role: mockRoles[1],
    },
  ];

  const mockPhotos: Express.Multer.File[] = [
    {
      fieldname: '',
      encoding: 'base64',
      originalname: 'TLOU2',
      size: 88,
      filename: 'TLOU2.jpg',
      mimetype: 'image/jpg',
      stream: Readable.from(['TLOU2.jpg']),
      destination: '',
      path: path.join(__dirname, '..', 'assets', 'boardPhotos', 'TLOU2.jpg'),
      buffer: Buffer.from(''),
    },
    {
      fieldname: '',
      encoding: 'base64',
      originalname: 'Uncharted4',
      size: 94,
      filename: 'Uncharted4.jpg',
      mimetype: 'image/jpg',
      stream: Readable.from(['Uncharted4.jpg']),
      destination: '',
      path: path.join(
        __dirname,
        '..',
        'assets',
        'boardPhotos',
        'Uncharted4.jpg',
      ),
      buffer: Buffer.from(''),
    },
    {
      fieldname: '',
      encoding: 'base64',
      originalname: 'TLOU_Ellie_with_Joel',
      size: 94,
      filename: 'TLOU_Ellie_with_Joel.jpg',
      mimetype: 'image/jpg',
      stream: Readable.from(['TLOU_Ellie_with_Joel.jpg']),
      destination: '',
      path: path.join(
        __dirname,
        '..',
        'assets',
        'pinPhotos',
        'TLOU_Ellie_with_Joel.jpg',
      ),
      buffer: Buffer.from(''),
    },
  ];

  const mockBoards: CreateBoardDTO[] = [
    {
      id: 1,
      author: mockUsers[0],
      visibility: true,
      title: 'The lost of us...',
      photo: mockPhotos[0],
    },
    {
      id: 2,
      author: mockUsers[1],
      visibility: false,
      title: 'Nathan Drake art',
      photo: mockPhotos[1],
    },
  ];

  const mockHistories: CreateHistoryDTO[] = [
    { author: mockUsers[0], saved_media: mockBoards[0] },
    { author: mockUsers[1], saved_media: mockBoards[1] },
  ];

  const mockNotifications: CreateNotificationDTO[] = [
    {
      id: 1,
      text: `Пользователь ${mockUsers[1].username} добавил вас в доску`,
      event: 'Автор добавил вас в доску',
      user: mockUsers[0],
      channel: mockUsers[0].username,
      author: mockUsers[1],
    },
    {
      id: 2,
      text: `Пользователь ${mockUsers[0].username} лайкнул ваш доску`,
      event: 'Лайк пина',
      user: mockUsers[1],
      channel: mockUsers[1].username,
      author: mockUsers[0],
    },
  ];

  const mockUsersService = {
    getCurrentUser: jest
      .fn()
      .mockImplementation((username: string): CreateUserDTO => {
        const currentUser = mockUsers.find(
          (mockUser) => mockUser.username === username,
        );

        return currentUser;
      }),
  };

  const mockHistoryService = {
    createNewHistory: jest.fn().mockImplementation((dto: CreateHistoryDTO) => {
      mockHistories.push(dto);

      return dto;
    }),
  };

  const mockBoardRepository = {
    find: jest.fn().mockRejectedValue(() => mockBoards),

    findOne: jest.fn().mockImplementation((title: string) => {
      const currentRole = mockBoards.find((role) => role.title === title);

      return currentRole;
    }),

    create: jest.fn().mockImplementation((dto: CreateBoardDTO) => {
      const newRole = dto;

      mockBoards.push(newRole);

      return newRole;
    }),

    update: jest
      .fn()
      .mockImplementation((title: string, dto: CreateBoardDTO) => {
        let currentBoard = mockBoards.find((board) => board.title === title);

        currentBoard = dto;

        return currentBoard;
      }),

    delete: jest.fn().mockImplementation((title: string) => {
      const currentBoard = mockBoards.find((board) => board.title === title);

      mockBoards.splice(currentBoard.id, 1);

      return currentBoard;
    }),

    save: jest.fn().mockRejectedValue((dto: CreateRoleDTO) => dto),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardsService,
        { provide: PinsService, useValue: {} },
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtTokenService, useValue: mockUsersService },
        { provide: HistoryService, useValue: mockHistoryService },
        { provide: NotificationService, useValue: {} },
        { provide: getRepositoryToken(UserEntity), useValue: {} },
        {
          provide: getRepositoryToken(BoardEntity),
          useValue: mockBoardRepository,
        },
        { provide: getRepositoryToken(UserEntity), useValue: {} },
        { provide: getRepositoryToken(NotificationEntity), useValue: {} },
        { provide: getRepositoryToken(HistoryEntity), useValue: {} },
      ],
    }).compile();

    service = module.get<BoardsService>(BoardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be get all boards from app', async () => {
    try {
      const currentUser = mockUsersService.getCurrentUser('Arkadiy228');

      const allBoards = await service.getAllBoards();

      expect(mockUsersService.getCurrentUser('Arkadiy228')).resolves.toEqual(
        mockUsers[0],
      );
      expect(await service.getAllBoards()).resolves.toEqual(allBoards);

      expect(mockBoardRepository.find).toHaveReturnedWith(allBoards);

      expect(mockBoardRepository.find).toHaveBeenCalledTimes(1);
    } catch (e) {
      console.log(e);
    }
  });

  it('should be get current board by title', async () => {
    try {
      const currentUser = mockUsersService.getCurrentUser('Arkadiy228');

      const currentBoard = await service.getCurrentBoard(
        'Nathan Drake art',
        currentUser,
      );

      const newHistory = {
        author: currentUser,
        saved_media: currentBoard,
      };

      expect(mockUsersService.getCurrentUser('Arkadiy228')).resolves.toEqual(
        mockUsers[0],
      );
      expect(
        await service.getCurrentBoard('Nathan Drake art', currentUser),
      ).resolves.toEqual(mockBoards[1]);
      expect(mockHistoryService.createNewHistory(newHistory)).resolves.toEqual(
        newHistory,
      );

      expect(mockBoardRepository.findOne).toHaveBeenCalledWith(
        currentBoard.title,
      );

      expect(mockBoardRepository.findOne).toHaveBeenCalledTimes(1);
    } catch (e) {
      console.log(e);
    }
  });

  it('should be create new board', async () => {
    try {
      const currentUser = mockUsersService.getCurrentUser('Arkadiy228');

      const mockPhoto: Express.Multer.File = {
        fieldname: '',
        encoding: 'base64',
        originalname: 'no_country_for_old_men',
        size: 94,
        filename: 'no_country_-for_old_men.jpg',
        mimetype: 'image/jpg',
        stream: Readable.from(['no_country_for_old_men.jpg']),
        destination: '',
        path: path.join(
          __dirname,
          '..',
          'assets',
          'boardPhotos',
          'no_country_for_old_men.jpg',
        ),
        buffer: Buffer.from(''),
      };

      const newBoardDTO: CreateBoardDTO = {
        id: 1,
        title: 'No country for old men - art',
        author: currentUser,
        visibility: true,
        photo: mockPhoto,
      };

      expect(mockUsersService.getCurrentUser('Arkadiy228')).resolves.toEqual(
        mockUsers[0],
      );
      expect(
        await service.createNewBoard(currentUser, newBoardDTO, mockPhoto),
      ).resolves.toEqual(newBoardDTO);

      expect(mockBoardRepository.create).toHaveBeenCalledWith(newBoardDTO);
      expect(mockBoardRepository.save).toHaveBeenCalledWith(newBoardDTO);

      expect(mockBoardRepository.create).toHaveBeenCalledTimes(1);
      expect(mockBoardRepository.save).toHaveBeenCalledTimes(1);
    } catch (e) {
      console.log(e);
    }
  });

  it('should be add a current board to current user', async () => {
    try {
      const currentUser = mockUsersService.getCurrentUser('Arkadiy228');

      const currentBoard = await service.getCurrentBoard(
        'No country for old men - art',
      );

      const savedBoard = await service.getCurrentBoard('The lost of us...');

      expect(mockUsersService.getCurrentUser('Arkadiy228')).resolves.toEqual(
        mockUsers[0],
      );
      expect(
        await service.getCurrentBoard('No country for old men - art'),
      ).resolves.toEqual(mockBoards[3]);
      expect(
        await service.getCurrentBoard('The lost of us...'),
      ).resolves.toEqual(mockBoards[0]);
      expect(
        await service.addCurrentBoard(
          currentUser,
          currentBoard.title,
          savedBoard.title,
        ),
      ).resolves.toEqual(savedBoard);

      expect(mockBoardRepository.findOne).toHaveBeenCalledWith(
        currentBoard.title,
      );
      expect(mockBoardRepository.update).toHaveBeenCalledWith(
        currentBoard.title,
      );

      expect(mockBoardRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockBoardRepository.update).toHaveBeenCalledTimes(1);
    } catch (e) {
      console.log(e);
    }
  });

  it('should be change visible param of the current board by user permission', async () => {
    try {
      const currentUser = mockUsersService.getCurrentUser('Arkadiy228');

      const currentBoard = await service.getCurrentBoard(
        'The lost of us...',
        currentUser,
      );

      expect(mockUsersService.getCurrentUser('Arkadiy228')).resolves.toEqual(
        mockUsers[0],
      );
      expect(
        await service.getCurrentBoard('The lost of us...', currentUser),
      ).resolves.toEqual(mockBoards[0]);
      expect(
        await service.changeVisibility(currentUser, 'The lost of us...', true),
      ).resolves.toEqual(currentBoard);

      expect(mockBoardRepository.findOne).toHaveBeenCalledWith(
        currentBoard.title,
      );
      expect(mockBoardRepository.update).toHaveBeenCalledWith(
        currentBoard.title,
        { visibility: true },
      );

      expect(mockBoardRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockBoardRepository.update).toHaveBeenCalledTimes(1);
    } catch (e) {
      console.log(e);
    }
  });

  it('should be update a current board by title and check user permission as owner', async () => {
    try {
      const currentUser = mockUsersService.getCurrentUser('Arkadiy228');

      const currentBoard = await service.getCurrentBoard(
        'The lost of us...',
        currentUser,
      );

      const updatedBoardDTO: CreateBoardDTO = {
        title: 'Angry Ellie ready to kill u, motherfucker...',
        author: currentUser,
        visibility: true,
        photo: mockPhotos[0],
      };

      expect(mockUsersService.getCurrentUser('Arkadiy228')).resolves.toEqual(
        currentUser,
      );
      expect(
        await service.getCurrentBoard('The lost of us...'),
      ).resolves.toEqual(currentBoard);
      expect(
        await service.updateCurrentBoard(
          currentUser,
          currentBoard.title,
          updatedBoardDTO,
        ),
      ).resolves.toEqual(updatedBoardDTO);

      expect(mockBoardRepository.findOne).toHaveBeenCalledWith(
        currentBoard.title,
      );
      expect(mockBoardRepository.update).toHaveBeenCalledWith(
        currentBoard.title,
        updatedBoardDTO,
      );

      expect(mockBoardRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockBoardRepository.update).toHaveBeenCalledTimes(1);
    } catch (e) {
      console.log(e);
    }
  });

  it('should be delete a current board by title and check user permission as owner', async () => {
    try {
      const currentUser = mockUsersService.getCurrentUser('Arkadiy228');

      const currentBoard = await service.getCurrentBoard(
        'The lost of us...',
        currentUser,
      );

      expect(mockUsersService.getCurrentUser('Arkadiy228')).resolves.toEqual(
        mockUsers[0],
      );
      expect(
        await service.getCurrentBoard('The lost of us...', currentUser),
      ).resolves.toEqual(mockBoards[0]);
      expect(
        await service.deleteCurrentBoard(currentUser, currentBoard.title),
      ).resolves.toEqual(currentBoard.title);

      expect(mockBoardRepository.findOne).toHaveBeenCalledWith(
        currentBoard.title,
      );
      expect(mockBoardRepository.delete).toHaveBeenCalledWith(
        currentBoard.title,
      );

      expect(mockBoardRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockBoardRepository.delete).toHaveBeenCalledTimes(1);
    } catch (e) {
      console.log(e);
    }
  });
});
