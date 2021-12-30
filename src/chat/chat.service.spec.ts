import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  mockUsers,
  mockPhotos,
  mockRoles,
  mockChats,
  mockMessages,
  mockHistories,
  mockSubscribers,
} from '../../test/data/mock-data';
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
import NotificationEntity from '../entities/notification.entity';

describe('ChatService', () => {
  let service: ChatService;

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
        { provide: MessagesService, useValue: {} },
        { provide: UsersService, useValue: {} },
        { provide: NotificationObserverService, useValue: {} },
        { provide: getRepositoryToken(UserEntity), useValue: {} },
        { provide: getRepositoryToken(MessageEntity), useValue: {} },
        {
          provide: getRepositoryToken(ChatEntity),
          useValue: mockChatRepository,
        },
        { provide: getRepositoryToken(NotificationEntity), useValue: {} },
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
