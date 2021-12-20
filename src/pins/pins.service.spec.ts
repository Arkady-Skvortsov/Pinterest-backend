import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import HistoryEntity from '../entities/history.entity';
import NotificationEntity from '../entities/notification.entity';
import { HistoryService } from '../history/history.service';
import { NotificationService } from '../notification/notification.service';
import JwtTokenEntity from '../entities/jwt-token.entity';
import PinEntity from '../entities/pin.entity';
import UserEntity from '../entities/users.entity';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import { PinsService } from './pins.service';

describe('PinsService', () => {
  let service: PinsService;
  let jwtTokenService: JwtTokenService;
  let notificationService: NotificationService;
  let historyService: HistoryService;

  let pinsRepository: Repository<PinEntity>;
  let jwtTokenRepository: Repository<JwtTokenEntity>;
  let usersRepository: Repository<UserEntity>;
  let notificationRepository: Repository<NotificationEntity>;
  let historyRepository: Repository<HistoryEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PinsService,
        JwtTokenService,
        NotificationService,
        HistoryService,
        { provide: getRepositoryToken(PinEntity), useValue: {} },
        { provide: getRepositoryToken(JwtTokenEntity), useValue: {} },
        { provide: getRepositoryToken(NotificationEntity), useValue: {} },
        { provide: getRepositoryToken(HistoryEntity), useValue: {} },
      ],
    })
      .overrideProvider(PinsService)
      .useValue({})
      .compile();

    service = module.get<PinsService>(PinsService);
    jwtTokenService = module.get<JwtTokenService>(JwtTokenService);
    notificationService = module.get<NotificationService>(NotificationService);
    historyService = module.get<HistoryService>(HistoryService);

    pinsRepository = module.get<Repository<PinEntity>>(
      getRepositoryToken(PinEntity),
    );
    jwtTokenRepository = module.get<Repository<JwtTokenEntity>>(
      getRepositoryToken(JwtTokenEntity),
    );
    usersRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    notificationRepository = module.get<Repository<NotificationEntity>>(
      getRepositoryToken(NotificationEntity),
    );
    historyRepository = module.get<Repository<HistoryEntity>>(
      getRepositoryToken(HistoryEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be get all pins in application', async () => {});

  it('should be get a current pin by his title', async () => {});

  it('should be create a new pin', async () => {});

  it('should be update a current pin by title through user permission', async () => {});

  it('should be delete a current pin by his title through user permission', async () => {});
});
