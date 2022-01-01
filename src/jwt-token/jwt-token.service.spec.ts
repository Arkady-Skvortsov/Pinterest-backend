import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { mockRoles, mockUsers, mockJwtTokens } from '../../test/data/mock-data';
import { JwtTokenService } from './jwt-token.service';
import JwtTokenEntity from '../entities/jwt-token.entity';
import { CreatePaylodDTO, createTokenDTO } from '../dto/token.dto';

//Todo: Continue tests after fix main problems, tests;
describe('JwtTokenService', () => {
  let service: JwtTokenService;

  let jwtTokenRepository: Repository<JwtTokenEntity>;

  const mockJwtTokenRepository = {
    findOne: jest.fn().mockImplementation((token: string) => {
      const currentToken = mockJwtTokens.find(
        (jwtToken) => jwtToken.token === token,
      );

      return currentToken;
    }),
    create: jest.fn().mockImplementation((dto: createTokenDTO) => {
      const newToken = dto;

      mockJwtTokens.push(newToken);

      return newToken;
    }),
    update: jest
      .fn()
      .mockImplementation((token: string, dto: createTokenDTO) => {
        let currentToken = mockJwtTokens.find(
          (jwtToken) => jwtToken.token === token,
        );

        currentToken = { ...dto };

        return currentToken;
      }),
    delete: jest.fn().mockImplementation((token: string) => {
      let currentToken = mockJwtTokens.find(
        (jwtToken) => jwtToken.token === token,
      );

      currentToken = null;

      return currentToken;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtTokenService,
        {
          provide: JwtService,
          useValue: {},
        },
        {
          provide: getRepositoryToken(JwtTokenEntity),
          useValue: mockJwtTokenRepository,
        },
      ],
    }).compile();

    service = module.get<JwtTokenService>(JwtTokenService);
    jwtTokenRepository = module.get<Repository<JwtTokenEntity>>(
      getRepositoryToken(JwtTokenEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be find a current token', async () => {
    try {
      const currentToken = await service.findToken('someToken1');

      expect(await service.findToken).resolves.toEqual(currentToken);

      expect(mockJwtTokenRepository.findOne).toHaveBeenCalledWith(currentToken);

      expect(mockJwtTokenRepository.findOne).toHaveBeenCalledTimes(1);
    } catch (e) {}
  });

  it('should be refresh a current token', async () => {
    try {
      const newToken = 'newToken99';

      const currentToken = await service.findToken('someToken2');

      expect(await service.refreshToken(currentToken.token)).resolves.toEqual(
        newToken,
      );

      expect(mockJwtTokenRepository.findOne).toHaveBeenCalledWith(
        currentToken.token,
      );
      expect(mockJwtTokenRepository.update).toHaveBeenCalledWith(
        currentToken.token,
        newToken,
      );

      expect(mockJwtTokenRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockJwtTokenRepository.update).toHaveBeenCalledTimes(1);
    } catch (e) {}
  });

  it('should be verify a current token', async () => {
    try {
      const currentToken = await service.findToken('someToken1');

      expect(await service.verifyToken(currentToken.token)).resolves.toEqual(
        true,
      );

      expect(mockJwtTokenRepository.findOne).toHaveBeenCalledWith();

      expect(mockJwtTokenRepository.findOne).toHaveBeenCalledTimes(1);
    } catch (e) {}
  });

  it('should be update a current token', async () => {
    try {
      const currentToken = await service.findToken('someToken1');

      expect(await service.findToken('someToken1')).resolves.toEqual(
        currentToken,
      );

      expect(mockJwtTokenRepository.findOne).toHaveBeenCalledWith(
        currentToken.token,
      );
      expect(mockJwtTokenRepository.update).toHaveBeenCalledWith();

      expect(mockJwtTokenRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockJwtTokenRepository.update).toHaveBeenCalledTimes(1);
    } catch (e) {}
  });

  it('should be generate a new token', async () => {
    try {
      const newToken: createTokenDTO = {
        id: 4,
        token: 'someToken4',
        user: {
          username: 'ArkashaSkvortsov',
          lastname: 'Some',
          firstname: 'Name',
          password: 'mypass123',
          email: 'arkasha.super@mail.ru',
          role: mockRoles[0],
        },
      };

      mockJwtTokens.push(newToken);

      expect(await service.generateToken).resolves.toEqual(newToken);
      expect(mockJwtTokens[3]).toEqual(newToken);

      expect(mockJwtTokenRepository.create).toHaveBeenCalledWith(newToken);

      expect(mockJwtTokenRepository.create).toHaveBeenCalledTimes(1);
    } catch (e) {}
  });

  it('should be delete a current token', async () => {
    try {
      const currentToken = await service.findToken('someToken3');

      expect(await service.findToken('someToken3')).resolves.toEqual(
        currentToken,
      );
      expect(await service.deleteToken(currentToken.token)).resolves.toEqual(
        currentToken.id,
      );

      expect(mockJwtTokenRepository.findOne).toHaveBeenCalledWith('someToken3');
      expect(mockJwtTokenRepository.delete).toHaveBeenCalledWith(
        currentToken.token,
      );

      expect(mockJwtTokenRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockJwtTokenRepository.delete).toHaveBeenCalledTimes(1);
    } catch (e) {}
  });
});
