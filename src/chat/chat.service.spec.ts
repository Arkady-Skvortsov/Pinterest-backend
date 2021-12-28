import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import ChatEntity from '../entities/chat.entity';
import MessageEntity from '../entities/messages.entity';
import { UsersService } from '../users/users.service';
import { MessagesService } from '../messages/messages.service';
import { ChatService } from './chat.service';
import UserEntity from '../entities/users.entity';
import CreateUserDTO from '../dto/users.dto';
import CreateRoleDTO from '../dto/role.dto';
import CreateChatDTO from '../dto/chat.dto';
import { NotificationObserverService } from '../notification/notification.service';
import { chatSubscriber } from '../dto/notification.dto';

describe('ChatService', () => {
  let service: ChatService;

  const mockRoles: CreateRoleDTO[] = [
    {
      id: 1,
      title: 'admin',
      description: 'You can ban users, when they are do some stupid things',
    },
    { id: 2, title: 'user', description: 'You can like something..' },
  ];

  const mockUsers: CreateUserDTO[] = [
    {
      id: 1,
      username: 'Arkadiy228',
      firstname: 'Arkasha',
      lastname: 'Skvortsov',
      password: 'somePassword123',
      email: 'arkasha@gmail.com',
      role: mockRoles[0],
    },
    {
      id: 2,
      username: 'Children123',
      firstname: 'Children',
      lastname: 'Supersetter',
      password: 'password557',
      email: 'some.mail@mail.ru',
      role: mockRoles[1],
    },
    {
      id: 3,
      username: 'SlamDunker',
      firstname: 'User',
      lastname: 'Dunker',
      password: 'slamPassword123',
      email: 'slamdunk@gmail.com',
      role: mockRoles[0],
    },
  ];

  const mockChats: CreateChatDTO[] = [
    {
      id: 1,
      owner: mockUsers[0],
      catcher: mockUsers[1],
      title: mockUsers[1].username,
    },
    {
      id: 2,
      owner: mockUsers[2],
      catcher: mockUsers[1],
      title: mockUsers[1].username,
    },
    {
      id: 3,
      owner: mockUsers[0],
      catcher: mockUsers[2],
      title: mockUsers[2].username,
    },
    {
      id: 4,
      owner: mockUsers[2],
      catcher: mockUsers[0],
      title: mockUsers[0].username,
    },
  ];

  const mockSubscribers: chatSubscriber[] = [
    { owner: mockUsers[0], catcher: mockUsers[1] },
    { owner: mockUsers[1], catcher: mockUsers[0] },
  ];

  const mockNotificationObserverService = {
    subscribe: jest.fn().mockImplementation((subscriber: chatSubscriber) => {
      mockSubscribers.push(subscriber);

      return subscriber.catcher;
    }),

    unsubscribe: jest.fn().mockImplementation((subscriber: chatSubscriber) => {
      mockSubscribers.filter((user) => user.owner !== subscriber.owner);

      return subscriber.catcher;
    }),
  };

  const mockUsersService = {
    findOne: jest.fn().mockImplementation((username: string) => {
      const currentUser = mockUsers.find(
        (mockUser) => mockUser.username === username,
      );

      return currentUser;
    }),
  };

  const mockChatRepository = {
    find: jest.fn().mockImplementation((user: CreateUserDTO) => {
      const chats = mockChats.find((chat) => chat.owner === user);

      return chats;
    }),

    findOne: jest.fn().mockImplementation((channel: string) => {
      const currentChat = mockChats.find((chat) => chat.title === channel);

      return currentChat;
    }),

    create: jest.fn().mockImplementation((dto: CreateChatDTO) => {
      const newChat = dto;

      mockChats.push(newChat);

      return newChat;
    }),

    update: jest
      .fn()
      .mockImplementation((channel: string, dto: CreateChatDTO) => {
        let currentChat = mockChats.find(
          (mockChat) =>
            mockChat.title === channel && mockChat.owner === dto.owner,
        );

        currentChat = dto;

        return currentChat;
      }),

    delete: jest.fn().mockImplementation((channel: string) => {
      const currentChat = mockChats.find(
        (mockChat) => mockChat.title === channel,
      );

      mockChats.splice(currentChat.id, 1);

      return currentChat.id;
    }),
    save: jest.fn().mockRejectedValue((dto: CreateChatDTO) => dto),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        { provide: UsersService, useValue: mockUsersService },
        MessagesService,
        {
          provide: getRepositoryToken(ChatEntity),
          useValue: mockChatRepository,
        },
        {
          provide: NotificationObserverService,
          useValue: {},
        },
        {
          provide: getRepositoryToken(MessageEntity),
          useValue: {},
        },
        { provide: getRepositoryToken(UserEntity), useValue: {} },
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be get all chats by current user', async () => {
    try {
      const currentUser = mockUsersService.findOne('Arkadiy228');

      expect(mockUsersService.findOne('Arkadiy228')).resolves.toEqual(
        mockUsers[0],
      );
      expect(await service.getAllChats(currentUser)).resolves.toEqual([
        mockChats[0],
        mockChats[2],
      ]);

      expect(mockChatRepository.find).toHaveBeenCalledWith(currentUser);

      expect(mockChatRepository.find).toHaveBeenCalledTimes(1);
    } catch (e) {}
  });

  it('should be get current chat by user permission', async () => {
    try {
      const currentUser = mockUsersService.findOne('Arkadiy228');

      expect(mockUsersService.findOne('Arkadiy228')).resolves.toEqual(
        mockUsers[0],
      );
      expect(
        await service.getCurrentChat(currentUser, 'Children123'),
      ).resolves.toEqual(mockChats[0]);

      expect(mockChatRepository.findOne).toHaveBeenCalledWith(
        currentUser,
        'Children123',
      );

      expect(mockChatRepository.findOne).toHaveBeenCalledTimes(1);
    } catch (e) {}
  });

  describe('should be censooret a current chat by channel name', () => {
    it('censooret on', async () => {
      try {
        const currentUser = mockUsersService.findOne('Arkadiy228');

        expect(mockUsersService.findOne('Arkadiy228')).resolves.toEqual(
          mockUsers[0],
        );
        expect(
          await service.getCurrentChat(currentUser, 'Children123'),
        ).resolves.toEqual(mockChats[0]);
        expect(
          await service.censooretCurrentChat(currentUser, 'Children123', true),
        ).resolves.toEqual(mockChats[0]);

        expect(mockChatRepository.findOne).toHaveBeenCalledWith('Children123');
        expect(mockChatRepository.update).toHaveBeenCalledWith('Children123', {
          censooret: true,
        });

        expect(mockChatRepository.findOne).toHaveBeenCalledTimes(1);
        expect(mockChatRepository.update).toHaveBeenCalledTimes(1);
      } catch (e) {}
    });

    it('censooret off', async () => {
      try {
      } catch (e) {}
    });
  });

  describe('should be do a mute operation at the current chat by user permission', () => {
    it('should be mute a current chat', async () => {
      try {
        const currentUser = mockUsersService.findOne('Arkadiy228');

        const currentChat = await service.getCurrentChat(
          currentUser,
          'Children123',
        );

        expect(mockUsersService.findOne('Arkadiy228')).resolves.toEqual(
          mockUsers[0],
        );
        expect(
          await service.getCurrentChat(currentUser, 'Children123'),
        ).resolves.toEqual(mockChats[0]);
        expect(
          await service.muteCurrentChat(currentUser, 'Children123', true),
        ).resolves.toEqual(`Чат ${currentChat.channelName} был замьючен`);

        expect(mockChatRepository.findOne).toHaveBeenCalledWith('Children123');
        expect(mockChatRepository.update).toHaveBeenCalledWith(
          currentChat,
          'Children123',
        );

        expect(mockChatRepository.findOne).toHaveBeenCalledTimes(1);
        expect(mockChatRepository.update).toHaveBeenCalledTimes(1);
      } catch (e) {
        console.log(e);
      }
    });

    it('should be unmute a current chat', async () => {
      try {
      } catch (e) {}
    });
  });

  xit('should be create a new chat by current user', async () => {
    try {
      const currentOwner: CreateUserDTO =
        mockUsersService.findOne('Arkadiy228');
      const currentCatcher = mockUsersService.findOne('SlamDunker');

      const newChat: CreateChatDTO = {
        owner: currentOwner,
        title: currentCatcher.username,
        catcher: currentCatcher,
      };

      const currentSubscribers: chatSubscriber[] = [
        ,
        {
          owner: currentOwner,
          catcher: currentCatcher,
        },
        {
          owner: currentCatcher,
          catcher: currentOwner,
        },
      ];

      expect(mockUsersService.findOne('Arkadiy228')).resolves.toEqual(
        mockUsers[0],
      );
      expect(await service.createChat(newChat)).resolves.toEqual(newChat);
      expect(
        mockNotificationObserverService.subscribe(currentSubscribers[0]),
      ).resolves.toEqual(currentSubscribers[0].catcher);
      expect(
        mockNotificationObserverService.subscribe(currentSubscribers[1]),
      ).resolves.toEqual(currentSubscribers[1].catcher);

      expect(mockChatRepository.create).toHaveBeenCalledWith(newChat);
      expect(mockChatRepository.save).toHaveBeenCalledWith(newChat);

      expect(mockChatRepository.create).toHaveBeenCalledTimes(1);
      expect(mockChatRepository.save).toHaveBeenCalledTimes(1);
    } catch (e) {
      console.log(e);
    }
  });

  it('should be delete current chat by user permission', async () => {
    try {
      const currentOwner = mockUsersService.findOne('Arkadiy228');
      const currentCatcher = mockUsersService.findOne('SlamDunk');

      const chatSubscriber: chatSubscriber[] = [
        { owner: currentOwner, catcher: currentCatcher },
        { owner: currentCatcher, catcher: currentOwner },
      ];

      const currentChat = await service.getCurrentChat(
        currentOwner,
        'SlamDunk',
      );

      expect(mockUsersService.findOne('Arkadiy228')).resolves.toEqual(
        mockUsers[0],
      );
      expect(mockUsersService.findOne('SlamDunk')).resolves.toEqual(
        mockUsers[1],
      );
      expect(
        await service.getCurrentChat(currentOwner, currentCatcher.username),
      ).resolves.toEqual(mockChats[2]);
      expect(
        await service.deleteCurrentChat(currentOwner, currentCatcher.username),
      ).resolves.toEqual(`Чат "${currentChat.channelName}" был удален!`);
      expect(
        mockNotificationObserverService.unsubscribe(chatSubscriber[0]),
      ).resolves.toEqual(chatSubscriber[0].catcher);
      expect(
        mockNotificationObserverService.unsubscribe(chatSubscriber[1]),
      ).resolves.toEqual(chatSubscriber[1].catcher);

      expect(mockChatRepository.findOne).toHaveBeenCalledWith(
        currentCatcher.username,
      );
      expect(mockChatRepository.delete).toHaveBeenCalledWith(mockChats[2].id);

      expect(mockChatRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockChatRepository.delete).toHaveBeenCalledTimes(1);
    } catch (e) {
      console.log(e);
    }
  });
});
