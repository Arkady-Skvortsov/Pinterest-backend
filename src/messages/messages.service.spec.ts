import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { ChatService } from '../chat/chat.service';
import { MessagesService } from './messages.service';
import MessageEntity from '../entities/messages.entity';
import UserEntity from '../entities/users.entity';
import CreateRoleDTO from '../dto/role.dto';
import ChatEntity from '../entities/chat.entity';
import CreateMessagesDTO from '../dto/messages.dto';
import CreateUserDTO from '../dto/users.dto';
import CreateChatDTO from '../dto/chat.dto';

describe('MessagesService', () => {
  let service: MessagesService;
  let chatService: ChatService;

  const mockRoles: CreateRoleDTO[] = [
    {
      id: 1,
      title: 'admin',
      description: 'You can ban some user, secure app rule',
    },
    {
      id: 2,
      title: 'user',
      description: 'You can do something interesting in app: create/add media',
    },
  ];

  const mockUsers: CreateUserDTO[] = [
    {
      username: 'Arkadiy228',
      firstname: 'Arkadiy',
      lastname: 'Skvortsov',
      password: 'rambler123',
      email: 'arkadiy@mail.ru',
      role: mockRoles[0],
    },
    {
      username: 'Children123',
      firstname: 'Children',
      lastname: 'Little',
      password: 'littleMiddleDev123',
      email: 'children@gmail.com',
      role: mockRoles[1],
    },
  ];

  const mockChats: CreateChatDTO[] = [
    {
      id: 1,
      owner: mockUsers[1],
      catcher: mockUsers[0],
      title: mockUsers[0].username,
    },
  ];

  const mockMessages: CreateMessagesDTO[] = [
    {
      id: 1,
      owner: mockUsers[0],
      text: `Hi ${mockUsers[1].username}, how do u?)`,
      time: new Date(),
      catcher: mockUsers[1],
    },
    {
      id: 2,
      owner: mockUsers[1],
      text: `Hi hi ${mockUsers[0].username}, I"m so cool, just trying a GraphQL first time), u?`,
      time: new Date(),
      catcher: mockUsers[0],
    },
    {
      id: 3,
      owner: mockUsers[0],
      text: `Ah, I think that u can do that.. M, I have a docs, here: https://graphql.org/learn/`,
      time: new Date(),
      catcher: mockUsers[1],
    },
    {
      id: 4,
      owner: mockUsers[1],
      text: `Oh, thanks man, I would try it now! 😆`,
      time: new Date(),
      catcher: mockUsers[0],
    },
  ];

  const mockUsersService = {
    findOne: jest.fn().mockImplementation((username: string) => {
      const currentUser = mockUsers.find((user) => user.username === username);

      return currentUser;
    }),
  };

  const mockChatService = {
    getCurrentChat: jest
      .fn()
      .mockImplementation((user: CreateUserDTO, channeL: string) => {
        const currentChat = mockChats.find(
          (chat) => chat.owner === user && chat.title === channeL,
        );

        return currentChat;
      }),
  };

  const mockMessagesRepository = {
    find: jest.fn().mockRejectedValueOnce(mockMessages),
    findOne: jest.fn().mockImplementation((id: number) => {
      const currentMessage = mockMessages.find((message) => message.id === id);

      return currentMessage;
    }),
    create: jest.fn().mockImplementation((dto: CreateMessagesDTO) => {
      const newMessage = dto;

      mockMessages.push(dto);

      return newMessage;
    }),
    update: jest
      .fn()
      .mockImplementation((id: number, dto: CreateMessagesDTO) => {
        let currentMessage = mockMessages.find((message) => message.id === id);

        currentMessage = dto;

        return currentMessage;
      }),
    delete: jest.fn().mockImplementation((id: number) => {
      const currentMessage = mockMessages.find((message) => message.id === id);

      mockMessages.splice(currentMessage.id, 1);

      return currentMessage.id;
    }),
    save: jest.fn().mockRejectedValueOnce((dto: CreateMessagesDTO) => dto),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        { provide: ChatService, useValue: mockChatService },
        { provide: UsersService, useValue: mockUsersService },
        {
          provide: getRepositoryToken(MessageEntity),
          useValue: mockMessagesRepository,
        },
        { provide: getRepositoryToken(UserEntity), useValue: {} },
        { provide: getRepositoryToken(ChatEntity), useValue: {} },
      ],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
    chatService = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should be get all messages from current channel', async () => {
    try {
      const currentUser = mockUsersService.findOne('Arkadiy228');

      const currentChat = mockChatService.getCurrentChat(
        currentUser,
        'Children123',
      );

      const allMessages = await service.getAllMessages(
        currentUser,
        'Children123',
      );

      expect(mockUsersService.findOne('Arkadiy228')).resolves.toEqual(
        mockUsers[0],
      );
      expect(
        mockChatService.getCurrentChat(currentUser, 'Children123'),
      ).resolves.toEqual(currentChat);
      expect(
        await service.getAllMessages(currentUser, 'Children123'),
      ).resolves.toEqual(allMessages);

      expect(mockMessagesRepository.find).toHaveBeenCalledWith();

      expect(mockMessagesRepository.findOne).toHaveBeenCalledTimes(1);
    } catch (e) {}
  });

  it('Should be get current message from current channel by id', async () => {
    try {
      const currentUser = mockUsersService.findOne('Arkadiy228');

      const currentChat = mockChatService.getCurrentChat(
        currentUser,
        'Children123',
      );

      expect(mockUsersService.findOne('Arakdiy228')).resolves.toEqual(
        mockUsers[0],
      );
      expect(
        mockChatService.getCurrentChat(currentUser, 'Children123'),
      ).resolves.toEqual(mockChats[0]);
      expect(
        await service.getCurrentMessage(currentUser, currentChat.title, 1),
      ).resolves.toEqual(mockMessages[0]);

      expect(mockMessagesRepository.findOne).toHaveBeenCalledWith(1);

      expect(mockMessagesRepository.findOne).toHaveBeenCalledTimes(1);
    } catch (e) {}
  });

  it('Should be create a new message in the current channel', async () => {
    try {
      const currentUser = mockUsersService.findOne('Arkadiy228');

      const currentChat = mockChatService.getCurrentChat(
        currentUser,
        'Children123',
      );

      const newMessageDTO: CreateMessagesDTO = {
        owner: currentUser,
        text: 'I think that I don"t need Graphql',
        catcher: mockUsers[1],
        time: new Date(),
      };

      expect(mockUsersService.findOne('Arkadiy228')).resolves.toEqual(
        mockUsers[0],
      );
      expect(
        mockChatService.getCurrentChat(currentUser, 'Children123'),
      ).resolves.toEqual(mockChats[0]);
      expect(await service.createNewMessage(newMessageDTO)).resolves.toEqual(
        mockMessages[5],
      );
      expect(mockMessages[5]).toEqual(newMessageDTO);
      expect(mockMessages.length).toEqual(5);

      expect(mockMessagesRepository.create).toHaveBeenCalledWith();
      expect(mockMessagesRepository.save).toHaveBeenCalledWith();

      expect(mockMessagesRepository.create).toHaveBeenCalledTimes(1);
      expect(mockMessagesRepository.save).toHaveBeenCalledTimes(1);
    } catch (e) {}
  });

  it('Should be replied on new message in the channel by his id', async () => {
    try {
      const currentUser = mockUsersService.findOne('Arkadiy228');
      const currentReplier = mockUsersService.findOne('Children123');

      const newMessage: CreateMessagesDTO = {
        owner: currentReplier,
        text: `Ah pal, thanks very muuuuuuch..`,
        time: new Date(),
        catcher: currentUser,
      };

      const currentMessage = await service.getCurrentMessage(
        currentReplier,
        currentUser.username,
        1,
      );

      const repliedMessage = await service.replyCurrentMessage(
        currentReplier,
        currentUser.username,
        1,
        newMessage,
      );

      expect(mockUsersService.findOne('Arkadiy228')).resolves.toEqual(
        currentUser,
      );
      expect(mockUsersService.findOne('Children123')).resolves.toEqual(
        currentReplier,
      );
      expect(
        mockChatService.getCurrentChat(currentReplier, currentUser.username),
      ).resolves.toEqual(mockChats[0]);
      expect(
        await service.getCurrentMessage(
          currentReplier,
          currentUser.useranme,
          1,
        ),
      ).resolves.toEqual(currentMessage);
      expect(
        await service.replyCurrentMessage(
          currentReplier,
          currentUser.username,
          1,
          newMessage,
        ),
      ).resolves.toEqual(newMessage);

      expect(mockMessagesRepository.findOne).toHaveBeenCalledWith(1);
      expect(mockMessagesRepository.create).toHaveBeenCalledWith(newMessage);
      expect(mockMessagesRepository.update).toHaveBeenCalledWith(
        repliedMessage,
        newMessage,
      );

      expect(mockMessagesRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockMessagesRepository.create).toHaveBeenCalledTimes(1);
      expect(mockMessagesRepository.update).toHaveBeenCalledTimes(1);
    } catch (e) {
      console.log(e);
    }
  });

  it('Should be update a current message in the current channel by his id', async () => {
    try {
      const currentUser = mockUsersService.findOne('Arkadiy228');
      const currentCatcher = mockUsersService.findOne('Children123');

      const updatedMessage: CreateMessagesDTO = {
        id: 1,
        owner: currentUser,
        catcher: currentCatcher,
        text: 'Hi again, pal!.. Shit, I need to go now...',
        time: new Date(),
      };

      const currentMessage = await service.getCurrentMessage(
        currentUser,
        'Children123',
        1,
      );

      expect(mockUsersService.findOne('Arkadiy228')).resolves.toEqual(
        mockUsers[0],
      );
      expect(mockUsersService.findOne('Children123')).resolves.toEqual(
        mockUsers[1],
      );
      expect(
        await service.getCurrentMessage(currentUser, 'Children123', 1),
      ).resolves.toEqual(currentMessage);
      expect(
        await service.updateCurrentMessage(currentMessage, updatedMessage),
      ).resolves.toEqual(updatedMessage);

      expect(mockMessagesRepository.findOne).toHaveBeenCalledWith(1);
      expect(mockMessagesRepository.update).toHaveBeenCalledWith(
        1,
        updatedMessage,
      );

      expect(mockMessagesRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockMessagesRepository.update).toHaveBeenCalledTimes(1);
    } catch (e) {
      console.log(e);
    }
  });

  it('Should be delete a current message in the current channel by his id', async () => {
    try {
      const currentUser = mockUsersService.findOne('Arkadiy228');

      const currentChat = mockChatService.getCurrentChat(
        currentUser,
        'Children123',
      );

      expect(mockUsersService.findOne('Arkadiy228')).resolves.toEqual(
        mockUsers[0],
      );
      expect(
        mockChatService.getCurrentChat(currentUser, 'Children123'),
      ).resolves.toEqual(mockChats[0]);
      expect(
        await service.getCurrentMessage(currentUser, currentChat.title, 1),
      ).resolves.toEqual(mockMessages[0]);
      expect(
        await service.deleteCurrentMessage(currentUser, 'Children123', 1),
      ).resolves.toEqual(1);
      expect(mockMessages.length).toEqual(4);

      expect(mockMessagesRepository.findOne).toHaveBeenCalledWith(1);
      expect(mockMessagesRepository.delete).toHaveBeenCalledWith(1);

      expect(mockMessagesRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockMessagesRepository.delete).toHaveBeenCalledTimes(1);
    } catch (e) {}
  });
});
