import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import HistoryEntity from '../entities/history.entity';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

describe('HistoryController', () => {
  let controller: HistoryController;
  let service: HistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoryController],
      providers: [
        HistoryService,
        { provide: getRepositoryToken(HistoryEntity), useValue: {} },
      ],
    }).compile();

    controller = module.get<HistoryController>(HistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
