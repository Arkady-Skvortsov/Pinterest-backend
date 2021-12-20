import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import { BoardsService } from '../boards/boards.service';
import { BoardEntity } from '../entities/board.entity';
import PinEntity from '../entities/pin.entity';
import UserEntity from '../entities/users.entity';
import { PinsService } from '../pins/pins.service';
import { UsersService } from '../users/users.service';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;
  let pinsService: PinsService;
  let jwtTokenService: JwtTokenService;
  let boardsService: BoardsService;
  let usersService: UsersService;

  let pinsRepository: Repository<PinEntity>;
  let boardsRepository: Repository<BoardEntity>;
  let usersRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        PinsService,
        BoardsService,
        UsersService,
        JwtTokenService,
        { provide: getRepositoryToken(PinEntity), useValue: {} },
        { provide: getRepositoryToken(BoardEntity), useValue: {} },
        { provide: getRepositoryToken(UserEntity), useValue: {} },
      ],
    }).compile();

    service = module.get<SearchService>(SearchService);
    pinsService = module.get<PinsService>(PinsService);
    boardsService = module.get<BoardsService>(BoardsService);
    usersService = module.get<UsersService>(UsersService);
    jwtTokenService = module.get<JwtTokenService>(JwtTokenService);

    pinsRepository = module.get<Repository<PinEntity>>(
      getRepositoryToken(PinEntity),
    );
    boardsRepository = module.get<Repository<BoardEntity>>(
      getRepositoryToken(BoardEntity),
    );
    usersRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be get a current result by title', () => {});
});
