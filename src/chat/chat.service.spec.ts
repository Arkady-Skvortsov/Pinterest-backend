import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ChatEntity from '../entities/chat.entity';
import MessageEntity from '../entities/messages.entity';
import { UsersService } from '../users/users.service';
import { MessagesService } from '../messages/messages.service';
import { ChatService } from './chat.service';
import UserEntity from '../entities/users.entity';

describe('ChatService', () => {
  let service: ChatService;
  let messagesService: MessagesService;
  let usersService: UsersService;

  let messagesRepository: Repository<MessageEntity>;
  let chatRepository: Repository<ChatEntity>;
  let usersRepository: Repository<UserEntity>;

  let mockMessagesService;
  let mockChatService;
  let mockUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        MessagesService,
        UsersService,
        { provide: getRepositoryToken(ChatEntity), useValue: {} },
        { provide: getRepositoryToken(MessageEntity), useValue: {} },
        { provide: getRepositoryToken(UserEntity), useValue: {} },
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
    messagesService = module.get<MessagesService>(MessagesService);
    usersService = module.get<UsersService>(UsersService);
    chatRepository = module.get<Repository<ChatEntity>>(
      getRepositoryToken(ChatEntity),
    );
    messagesRepository = module.get<Repository<MessageEntity>>(
      getRepositoryToken(MessageEntity),
    );
    usersRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be get all chat by user permission', async () => {});

  it('should be get current chat by user permission', async () => {});

  it('should be mute current chat by user permission', async () => {});

  it('should be delete current chat by user permission', async () => {});
});
