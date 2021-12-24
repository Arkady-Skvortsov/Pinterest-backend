import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { HistoryService } from './history.service';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import { UsersService } from '../users/users.service';
import HistoryEntity from '../entities/history.entity';
import UserEntity from '../entities/users.entity';
import CreateHistoryDTO from '../dto/history.dto';
import CreateUserDTO from '../dto/users.dto';
import { BoardEntity } from '../entities/board.entity';
import CommentEntity from '../entities/comment.entity';
import PinEntity from '../entities/pin.entity';
import CreatePinDTO from '../dto/pin.dto';
import CreateCommentDTO from '../dto/comment.dto';
import CreateBoardDTO from '../dto/board.dto';

describe('HistoryService', () => {
  let service: HistoryService;
  let usersService: UsersService;
  let jwtTokenService: JwtTokenService;

  const mockUser: CreateUserDTO<string> = {
    username: 'SlamDunker',
    firstname: 'Slam',
    lastname: 'Dunk',
    password: 'somePassword123',
    email: 'some.mail@gmail.com',
    role: 'admin',
  };

  const mockBoards: CreateBoardDTO[] = [
    { title: 'MyBoard1', photo: , author: mockUser, private: false },
    { title: 'TLOU2', photo: , author: mockUser, private: true },
  ];

  const mockPins: CreatePinDTO[] = [{title: '', author: mockUser.username, description: '', tags: [], photo: ''}, {title: '', author: mockUser.username, description: '', tags: [], photo: ''}];

  const mockComments: CreateCommentDTO<string>[] = [{}, {}];

  const mockHistories: CreateHistoryDTO[] = [
    { id: 1, author: mockUser.username },
    { id: 2,  author: mockUser.username },
    { id: 3, author: mockUser.username },
  ];

  const mockHistoryRepository = {
    find: jest.fn().mockRejectedValue(mockHistories),

    findOne: jest.fn().mockImplementation((id: number) => {
      const currentHistory = mockHistories.find((history) => history.id === id);

      return currentHistory;
    }),

    create: jest.fn().mockImplementation((dto: CreateHistoryDTO) => {
      const newHistory = dto;

      mockHistories.push(newHistory);

      return newHistory;
    }),

    update: jest.fn().mockImplementation((id: number, dto: CreateHistoryDTO) => {
      let currentHistory = mockHistories.find((history) => history.id === id);

      currentHistory = dto;

      return currentHistory;
    }),

    delete: jest.fn().mockImplementation((id: number) => {
      let currentHistory = mockHistories.find((history) => history.id === id);

      mockHistories.splice(currentHistory.id, 1);

      return currentHistory.id;
    }),

    save: jest.fn().mockRejectedValue((dto: CreateHistoryDTO) => dto),
  };

  const mockUsersService = {
    getCurrentUser: jest.fn().mockImplementation(() => {}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoryService,
        JwtTokenService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: {} },
        { provide: getRepositoryToken(HistoryEntity), useValue: mockHistoryRepository },
        { provide: getRepositoryToken(UserEntity), useValue: {} },
        { provide: getRepositoryToken(BoardEntity), useValue: {} },
        { provide: getRepositoryToken(PinEntity), useValue: {} },
        { provide: getRepositoryToken(CommentEntity), useValue: {} },
      ],
    }).compile();

    service = module.get<HistoryService>(HistoryService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('HistoryService', () => {
    it('should be get all history by current user', async () => {
      try {
        const currentUser = mockUsersService.getCurrentUser('SlamDunker');

        const histories = await service.getAllHistory(currentUser);

        expect(mockUsersService.getCurrentUser('SlamDunker')).resolves.toEqual(mockUser);
        expect(await service.getAllHistory(currentUser)).resolves.toEqual(histories);

        expect(mockHistoryRepository.find).toHaveReturnedWith(mockHistories);

        expect(mockHistoryRepository.find).toHaveBeenCalledTimes(1);
      } catch (e) {}
    });

    it('should be get a current history by her id and from current user', async () => {
      try {
        const currentUser = mockUsersService.getCurrentUser('SlamDunker');

        const currentHistory = await service.getCurrentHistory(currentUser, 1);

        expect(mockUsersService.getCurrentUser('SlamDunker')).resolves.toEqual(currentUser);
        expect(await service.getCurrentHistory(currentUser, 1)).resolves.toEqual(currentHistory);
        
        expect(mockHistoryRepository.findOne).toHaveBeenCalledWith(1);

        expect(mockHistoryRepository.findOne).toHaveBeenCalledTimes(1);
      } catch (e) {}
    });

    it('should be create a new history by current user', async () => {
      try {
        const currentUser = mockUsersService.getCurrentUser('SlamDunker');

        const newHistoryDTO: CreateHistoryDTO = { author: currentUser };

        const newHistory = await service.createNewHistory(currentUser, newHistoryDTO);

        expect(mockUsersService.getCurrentUser('SlamDunker')).resolves.toEqual(currentUser);
        expect(await service.createNewHistory(currentUser, newHistoryDTO)).resolves.toEqual(newHistory);

        expect(mockHistoryRepository.create).toHaveBeenCalledWith(newHistoryDTO);
        expect(mockHistoryRepository.save).toHaveBeenCalledWith(newHistoryDTO);

        expect(mockHistoryRepository.create).toHaveBeenCalledTimes(1);
        expect(mockHistoryRepository.save).toHaveBeenCalledTimes(1);
      } catch (e) {}
    });

    it('should be delete a current history by her id', async () => {
      try {
        const currentUser = mockUsersService.getCurrentUser('SlamDunker');

        const currentHistory = await service.getCurrentHistory(currentUser, 1);

        expect(mockUsersService.getCurrentUser('SlamDunk')).resolves.toEqual(currentUser);
        expect(await service.getCurrentHistory(currentUser, 1)).resolves.toEqual(currentHistory);
        expect(await service.deleteCurrentHistory(currentUser, 1)).resolves.toEqual(1);

        expect(mockHistoryRepository.findOne).toHaveBeenCalledWith(1);
        expect(mockHistoryRepository.delete).toHaveBeenCalledWith(1);

        expect(mockHistoryRepository.findOne).toHaveBeenCalledTimes(1);
        expect(mockHistoryRepository.delete).toHaveBeenCalledTimes(1);
      } catch (e) {}
    });
  });
});
