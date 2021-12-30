import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import AccountSettingsEntity from '../entities/account-settings.entity';
import { UserSettingsService } from './user-settings.service';
import UserEntity from '../entities/users.entity';

describe('UserSettingsService', () => {
  let service: UserSettingsService;
  let usersService: UsersService;

  const mockUsersService = {};

  let accountSettingsRepository: Repository<AccountSettingsEntity>;
  let usersRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserSettingsService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: getRepositoryToken(AccountSettingsEntity), useValue: {} },
        { provide: getRepositoryToken(UserEntity), useValue: {} },
      ],
    }).compile();

    service = module.get<UserSettingsService>(UserSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get all settings by user', async () => {
    try {
    } catch (e) {
      console.log(e);
    }
  });
});
