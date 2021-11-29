import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserEntity from '../entities/users.entity';
import UsersEntity from '../entities/users.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: Repository<UsersEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<UsersEntity>>(
      getRepositoryToken(UsersEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', () => {});

  it('should return a current user by his id', () => {});

  it('should create a new user', () => {});

  it('should update a current user by his id', () => {});

  it('should ban a current user by his username', () => {});
});
