import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
]import { Repository } from 'typeorm';
import { JwtTokenService } from './jwt-token.service';
import JwtTokenEntity from '../entities/jwt-token.entity';

describe('JwtTokenService', () => {
  let service: JwtTokenService;

  let jwtTokenRepository: Repository<JwtTokenService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtTokenService,
        { provide: getRepositoryToken(JwtTokenEntity), useValue: {} },
      ],
    }).compile();

    service = module.get<JwtTokenService>(JwtTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
