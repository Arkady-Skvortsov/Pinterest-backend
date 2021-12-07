import { Test, TestingModule } from '@nestjs/testing';
import { subscribe } from 'graphql';
import { NotificationGateway } from './notification.gateway';

describe('NotificationGateway', () => {
  let gateway: NotificationGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationGateway],
    }).compile();

    gateway = module.get<NotificationGateway>(NotificationGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should be subscribe to the current room by username of the author', () => {
    //gateway.joinCurrentRoom();
  });

  it('should be unsubscribe from current room by username', () => {});

  it('should be send notification to the current room by username', () => {});
});
