import { CacheModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RedisClient } from 'redis';
import { RedisService } from './redis.service';

describe('RedisService', () => {
  let service: RedisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedisService],
    }).compile();

    service = module.get<RedisService>(RedisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be get current subject from cache', () => {});

  it('should be set current subject from cache', () => {});

  it('should be delete current subject from cache', () => {});

  it('should be restore current subject from cache', () => {});
});
