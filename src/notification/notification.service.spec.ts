import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import UserEntity from '../entities/users.entity';
import NotificationEntity from '../entities/notification.entity';
import { UsersService } from '../users/users.service';
import {
  NotificationObserverService,
  NotificationService,
} from './notification.service';

describe('NotificationObserverService', () => {
  let service: NotificationObserverService;
  let notificationService: NotificationService;
  let usersService: UsersService;

  let usersRepository: Repository<UserEntity>;
  let notificationRepository: Repository<NotificationEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationObserverService,
        NotificationService,
        UsersService,
        { provide: getRepositoryToken(NotificationEntity), useValue: {} },
        { provide: getRepositoryToken(UserEntity), useValue: {} },
      ],
    }).compile();

    service = module.get<NotificationObserverService>(
      NotificationObserverService,
    );
    notificationService = module.get<NotificationService>(NotificationService);
    usersService = module.get<UsersService>(UsersService);

    usersRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    notificationRepository = module.get<Repository<NotificationEntity>>(
      getRepositoryToken(NotificationEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('NotificationService', () => {
    it('should be get all notification from current channel', () => {});

    it('should be get a current notification from current channel', () => {});

    it('should be create a new notification', () => {});

    it('should be delete a current notification from current channel', () => {});
  });

  describe('NotificationObserverService', () => {
    it('should be subscribe on the current author', () => {});

    it('should be notify all subscribers from current author', () => {});

    it('should be unsubscribe from current author', () => {});
  });
});
