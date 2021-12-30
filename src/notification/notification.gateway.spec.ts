import { Test, TestingModule } from '@nestjs/testing';
import {
  mockRoles,
  mockUsers,
  mockNotifications,
} from '../../test/data/mock-data';
import { NotificationGateway } from './notification.gateway';
import {
  NotificationObserverService,
  NotificationService,
} from './notification.service';

describe('NotificationGateway', () => {
  let gateway: NotificationGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationGateway,
        { provide: NotificationService, useValue: {} },
        { provide: NotificationObserverService, useValue: {} },
      ],
    }).compile();

    gateway = module.get<NotificationGateway>(NotificationGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should be join to the current room by username of the author', () => {
    try {
    } catch (e) {
      console.log(e);
    }
  });

  it('should be drop current room by username', () => {
    try {
    } catch (e) {
      console.log(e);
    }
  });

  it('should be send notification to the current room by username', () => {
    try {
    } catch (e) {
      console.log(e);
    }
  });
});
