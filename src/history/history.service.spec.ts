import { Test, TestingModule } from '@nestjs/testing';
import { HistoryMementoService } from './history.service';

describe('HistoryMementoService', () => {
  let service: HistoryMementoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoryMementoService],
    }).compile();

    service = module.get<HistoryMementoService>(HistoryMementoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
