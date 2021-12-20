import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import JwtTokenEntity from '../entities/jwt-token.entity';
import UserEntity from '../entities/users.entity';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtTokenService: JwtTokenService;

  let userRepository: Repository<UserEntity>;
  let jwtTokenRepository: Repository<JwtTokenEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        JwtTokenService,
        { provide: getRepositoryToken(UserEntity), useValue: {} },
        { provide: getRepositoryToken(JwtTokenEntity), useValue: {} },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtTokenService = module.get<JwtTokenService>(JwtTokenService);

    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    jwtTokenRepository = module.get<Repository<JwtTokenEntity>>(
      getRepositoryToken(JwtTokenEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be registered a new user', async () => {});

  it('should be authorized a user', async () => {});

  it('should be logout from app', async () => {});

  it('should be delete account of the current user', async () => {});
});
