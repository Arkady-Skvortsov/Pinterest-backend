import { Test, TestingModule } from '@nestjs/testing';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

describe('ChatGateway', () => {
  let gateway: ChatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatGateway],
    }).compile();

    gateway = module.get<ChatGateway>(ChatGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should be join to the current chat', async () => {
    try {
    } catch (e) {
      console.log(e);
    }
  });

  it('should be send message to the current chat', async () => {
    try {
    } catch (e) {
      console.log(e);
    }
  });

  it('should be drop a current room', async () => {
    try {
    } catch (e) {
      console.log(e);
    }
  });
});
