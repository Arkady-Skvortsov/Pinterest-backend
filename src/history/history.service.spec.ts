import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  Caretaker,
  HistoryMementoService,
  HistoryService,
  Originator,
} from './history.service';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import { UsersService } from '../users/users.service';
import HistoryEntity from '../entities/history.entity';
import UserEntity from '../entities/users.entity';
import CreateHistoryDTO from '../dto/history.dto';
import CreateUserDTO from '../dto/users.dto';

describe('HistoryMementoService', () => {
  let service: HistoryMementoService;
  let historyService: HistoryService;
  let careTaker: Caretaker;
  let originator: Originator;
  let usersService: UsersService;
  let jwtTokenService: JwtTokenService;

  let histories: CreateHistoryDTO[];
  let user: CreateUserDTO<string>;

  let historyRepository: Repository<HistoryEntity>;
  let usersRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoryMementoService,
        HistoryService,
        Caretaker,
        Originator,
        UsersService,
        JwtTokenService,
        { provide: getRepositoryToken(HistoryEntity), useValue: {} },
        { provide: getRepositoryToken(UserEntity), useValue: {} },
      ],
    }).compile();

    service = module.get<HistoryMementoService>(HistoryMementoService);
    historyService = module.get<HistoryService>(HistoryService);
    originator = module.get<Originator>(Originator);
    careTaker = module.get<Caretaker>(Caretaker);

    historyRepository = module.get<Repository<HistoryEntity>>(
      getRepositoryToken(HistoryEntity),
    );
    usersRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('HistoryService', () => {
    it('should be get all history by current user', async () => {});

    it('should be get a current history by her id and from current user', async () => {});

    it('should be create a new history by current user', async () => {});

    it('should be update a current history by her id', async () => {});

    it('should be delete a current history by her id', async () => {});
  });

  describe('Memento (HistoryMementoService, CareTaker, Originator) pattern', () => {});
});
