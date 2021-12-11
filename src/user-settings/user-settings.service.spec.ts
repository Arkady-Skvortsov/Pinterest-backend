import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import AccountSettingsEntity from '../entities/account-settings.entity';
import TimeLineEntity from '../entities/timeline-settings.entity';
import { UserSettingsService } from './user-settings.service';
import UserEntity from '../entities/users.entity';

describe('UserSettingsService', () => {
  let service: UserSettingsService;
  let usersService: UsersService;

  let accountSettingsRepository: Repository<AccountSettingsEntity>;
  let timelineSettingsRepository: Repository<TimeLineEntity>;
  let usersRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserSettingsService,
        UsersService,
        { provide: getRepositoryToken(AccountSettingsEntity), useValue: {} },
        { provide: getRepositoryToken(TimeLineEntity), useValue: {} },
        { provide: getRepositoryToken(UserEntity), useValue: {} },
      ],
    }).compile();

    service = module.get<UserSettingsService>(UserSettingsService);
    usersService = module.get<UsersService>(UsersService);

    accountSettingsRepository = module.get<Repository<AccountSettingsEntity>>(
      getRepositoryToken(AccountSettingsEntity),
    );
    timelineSettingsRepository = module.get<Repository<TimeLineEntity>>(
      getRepositoryToken(TimeLineEntity),
    );
    usersRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
