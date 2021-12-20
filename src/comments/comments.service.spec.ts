import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CommentEntity from '../entities/comment.entity';
import UsersEntity from '../entities/users.entity';
import PinsEntity from '../entities/pin.entity';
import HistoryEntity from '../entities/history.entity';
import { UsersService } from '../users/users.service';
import { PinsService } from '../pins/pins.service';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import { MediaService } from '../media/media.service';
import { HistoryService } from '../history/history.service';
import { CommentsService } from './comments.service';
import NotificationEntity from '../entities/notification.entity';
import { NotificationService } from '../notification/notification.service';

describe('CommentsService', () => {
  let service: CommentsService;
  let usersService: UsersService;
  let pinsService: PinsService;
  let jwtTokenService: JwtTokenService;
  let mediaService: MediaService;
  let historyService: HistoryService;
  let notificationService: NotificationService;

  let commentsRepository: Repository<CommentEntity>;
  let usersRepository: Repository<UsersEntity>;
  let pinsRepository: Repository<PinsEntity>;
  let historyRepository: Repository<HistoryEntity>;
  let notificationRepository: Repository<NotificationEntity>;

  let mockCommentsRepository;
  let mockUsersRepository;
  let mockPinsRepository;
  let mockHistoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        UsersService,
        PinsService,
        JwtTokenService,
        MediaService,
        HistoryService,
        NotificationService,
        { provide: getRepositoryToken(CommentEntity), useValue: {} },
        { provide: getRepositoryToken(UsersEntity), useValue: {} },
        { provide: getRepositoryToken(PinsEntity), useValue: {} },
        { provide: getRepositoryToken(HistoryEntity), useValue: {} },
        { provide: getRepositoryToken(NotificationEntity), useValue: {} },
      ],
    })
      .overrideProvider(CommentsService)
      .useValue({})
      .compile();

    service = module.get<CommentsService>(CommentsService);
    usersService = module.get<UsersService>(UsersService);
    pinsService = module.get<PinsService>(PinsService);
    jwtTokenService = module.get<JwtTokenService>(JwtTokenService);
    mediaService = module.get<MediaService>(MediaService);
    historyService = module.get<HistoryService>(HistoryService);
    notificationService = module.get<NotificationService>(NotificationService);

    commentsRepository = module.get<Repository<CommentEntity>>(
      getRepositoryToken(CommentEntity),
    );
    usersRepository = module.get<Repository<UsersEntity>>(
      getRepositoryToken(UsersEntity),
    );
    pinsRepository = module.get<Repository<PinsEntity>>(
      getRepositoryToken(PinsEntity),
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

  it('should be get all comments under current pin by his title', async () => {});

  it('should be get current comment by his id under current pin by his title', async () => {});

  it('should be create new comment under current pin by his title', async () => {});

  it('should be update a current comment by his id under current pin by his title', async () => {});

  it('should be reply to the current comment by his id under current pin by his title', async () => {});

  it('should be delete a current comment by his id under current pin by his title', async () => {});

  it('should be like a current comment by his id under current pin by his title', async () => {});
});
