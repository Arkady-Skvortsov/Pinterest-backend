import { Test, TestingModule } from '@nestjs/testing';
import { NotificationObserverService } from './notification.service';

describe('NotificationObserverService', () => {
  let service: NotificationObserverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationObserverService],
    }).compile();

    service = module.get<NotificationObserverService>(
      NotificationObserverService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
