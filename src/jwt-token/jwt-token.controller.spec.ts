import { Test, TestingModule } from '@nestjs/testing';
import { JwtTokenController } from './jwt-token.controller';

describe('JwtTokenController', () => {
  let controller: JwtTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JwtTokenController],
    }).compile();

    controller = module.get<JwtTokenController>(JwtTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
