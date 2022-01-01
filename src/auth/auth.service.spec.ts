import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockUsers, mockRoles, mockJwtTokens } from '../../test/data/mock-data';
import { FileEntity } from '../entities/file.entity';
import { FileService } from '../file/file.service';
import { getRepository, Repository } from 'typeorm';
import JwtTokenEntity from '../entities/jwt-token.entity';
import UserEntity from '../entities/users.entity';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import { RolesService } from '../roles/roles.service';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: {} },
        { provide: FileService, useValue: {} },
        { provide: JwtTokenService, useValue: {} },
        { provide: RolesService, useValue: {} },
        { provide: JwtService, useValue: {} },
        { provide: getRepositoryToken(UserEntity), useValue: {} },
        { provide: getRepositoryToken(FileEntity), useValue: {} },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be registered a new user', async () => {});

  it('should be authorized a user', async () => {});

  it('should be logout from app', async () => {});

  it('should be delete account of the current user', async () => {});
});
