import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ChatService } from '../chat/chat.service';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import { MessagesService } from './messages.service';
import MessageEntity from '../entities/messages.entity';
import UserEntity from '../entities/users.entity';
import ChatEntity from '../entities/chat.entity';

describe('MessagesService', () => {
  let service: MessagesService;
  let jwtTokenService: JwtTokenService;
  let usersService: UsersService;
  let chatService: ChatService;

  let messagesRepository: Repository<MessageEntity>;
  let usersRepository: Repository<UserEntity>;
  let chatRepository: Repository<ChatEntity>;

  let mockService;
  let mockJwtService;

  const mockMessagesRepository = {
    find: jest.fn().mockImplementation(),
    findOne: jest.fn().mockImplementation(),
    create: jest.fn().mockImplementation(),
    update: jest.fn().mockImplementation(),
    save: jest.fn().mockImplementation(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        UsersService,
        JwtTokenService,
        { provide: JwtService, useValue: {} },
        { provide: getRepositoryToken(MessageEntity), useValue: {} },
        { provide: getRepositoryToken(UserEntity), useValue: {} },
        { provide: getRepositoryToken(ChatEntity), useValue: {} },
      ],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
    jwtTokenService = module.get<JwtTokenService>(JwtTokenService);
    usersService = module.get<UsersService>(UsersService);
    chatService = module.get<ChatService>(ChatService);

    messagesRepository = module.get<Repository<MessageEntity>>(
      getRepositoryToken(MessageEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should be get all messages from current channel', async () => {});

  it('Should be get current message from current channel by id', async () => {});

  it('Should be create a new message in the current channel', async () => {});

  it('Should be update a current message in the current channel by his id', async () => {});

  it('Should be delete a current message in the current channel by his id', async () => {});
});
