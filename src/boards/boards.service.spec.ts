import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PinEntity from '../entities/pin.entity';
import { BoardEntity } from '../entities/board.entity';
import UserEntity from '../entities/users.entity';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import { UsersService } from '../users/users.service';
import { BoardsService } from './boards.service';
import CreateBoardDTO from '../dto/board.dto';
import { PinsService } from '../pins/pins.service';
import CreateUserDTO from '../dto/users.dto';
import CreatePinDTO from '../dto/pin.dto';
import {
  HistoryMementoService,
  HistoryService,
} from '../history/history.service';
import { NotificationService } from '../notification/notification.service';
import HistoryEntity from '../entities/history.entity';
import NotificationEntity from '../entities/notification.entity';
import CreateNotificationDTO from '../dto/notification.dto';
import CreateHistoryDTO from '../dto/history.dto';

describe('BoardsService', () => {
  let service: BoardsService;
  let usersService: UsersService;
  let jwtTokenService: JwtTokenService;
  let pinService: PinsService;
  let historyMementoService: HistoryMementoService;
  let historyService: HistoryService;
  let notificationService: NotificationService;

  let usersRepository: Repository<UserEntity>;
  let boardRepository: Repository<BoardEntity>;
  let pinRepository: Repository<PinEntity>;
  let historyRepository: Repository<HistoryEntity>;
  let notificationRepository: Repository<NotificationEntity>;

  let user: CreateUserDTO<string>;
  let boards: CreateBoardDTO<string>[];
  let pin: CreatePinDTO;
  let notification: CreateNotificationDTO<string>;
  let history: CreateHistoryDTO;

  let mockUserRepository;
  let mockBoardRepository;
  let mockPinRepository;
  let mockHistoryRepository;
  let mockHistoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardsService,
        PinsService,
        UsersService,
        JwtTokenService,
        HistoryService,
        NotificationService,

        { provide: getRepositoryToken(UserEntity), useValue: {} },
        { provide: getRepositoryToken(BoardEntity), useValue: {} },
        { provide: getRepositoryToken(UserEntity), useValue: {} },
        { provide: getRepositoryToken(NotificationEntity), useValue: {} },
        { provide: getRepositoryToken(HistoryEntity), useValue: {} },
      ],
    })
      .overrideProvider(UsersService)
      .useValue({})
      .compile();

    service = module.get<BoardsService>(BoardsService);
    usersService = module.get<UsersService>(UsersService);
    pinService = module.get<PinsService>(PinsService);
    jwtTokenService = module.get<JwtTokenService>(JwtTokenService);
    historyService = module.get<HistoryService>(HistoryService);

    usersRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    boardRepository = module.get<Repository<BoardEntity>>(
      getRepositoryToken(BoardEntity),
    );
    pinRepository = module.get<Repository<PinEntity>>(
      getRepositoryToken(PinEntity),
    );
    historyRepository = module.get<Repository<HistoryEntity>>(
      getRepositoryToken(HistoryEntity),
    );
    notificationRepository = module.get<Repository<NotificationEntity>>(
      getRepositoryToken(NotificationEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  xit('should be get all boards from app', async () => {});

  xit('should be get current board by title', async () => {});

  xit('should be create new board', async () => {});

  xit('should be update a current board by title and check user permission as owner', async () => {});

  xit('should be delete a current board by title and check user permission as owner', async () => {});
});
