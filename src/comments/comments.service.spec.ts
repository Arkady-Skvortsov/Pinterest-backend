import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as path from 'path';
import { Readable } from 'stream';
import { Repository } from 'typeorm';
import CreatePinDTO from '../dto/pin.dto';
import CreateCommentDTO from '../dto/comment.dto';
import CommentEntity from '../entities/comment.entity';
import UsersEntity from '../entities/users.entity';
import PinsEntity from '../entities/pin.entity';
import HistoryEntity from '../entities/history.entity';
import { UsersService } from '../users/users.service';
import { PinsService } from '../pins/pins.service';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import { MediaService } from '../media/media.service';
import { HistoryService } from '../history/history.service';
import { CommentsService } from './comments.service';
import NotificationEntity from '../entities/notification.entity';
import { NotificationService } from '../notification/notification.service';
import CreateHistoryDTO from '../dto/history.dto';
import CreateUserDTO from '../dto/users.dto';
import CreateNotificationDTO, { subscriber } from '../dto/notification.dto';
import CreateRoleDTO from '../dto/role.dto';

describe('CommentsService', () => {
  let service: CommentsService;
  let usersService: UsersService;
  let pinsService: PinsService;
  let jwtTokenService: JwtTokenService;
  let mediaService: MediaService;
  let historyService: HistoryService;
  let notificationService: NotificationService;

  let commentsRepository: Repository<CommentEntity>;
  let usersRepository: Repository<UsersEntity>;
  let pinsRepository: Repository<PinsEntity>;
  let historyRepository: Repository<HistoryEntity>;
  let notificationRepository: Repository<NotificationEntity>;

  const mockRoles: CreateRoleDTO[] = [
    {
      id: 1,
      title: 'user',
      description: 'You can create you"r pin and interact with media in app',
    },
    {
      id: 2,
      title: 'admin',
      description:
        'You can ban current user and secure rules of you"r application',
    },
  ];

  const mockPhotos: Express.Multer.File[] = [
    {
      fieldname: '',
      encoding: '',
      originalname: 'mario_art',
      size: 88,
      filename: 'mario_art.jpg',
      mimetype: 'image/jpg',
      stream: Readable.from(['mario_art.jpg']),
      destination: '',
      path: path.join(__dirname, '..', 'users', 'pinPhoto', 'mario_art.jpg'),
      buffer: Buffer.from(''),
    },
    {
      fieldname: '',
      encoding: '',
      originalname: 'ts_art',
      size: 94,
      filename: 'ts_art.jpg',
      mimetype: 'image/jpg',
      stream: Readable.from(['ts_art.jpg']),
      destination: '',
      path: path.join(__dirname, '..', 'users', 'pinPhoto', 'ts_art.jpg'),
      buffer: Buffer.from(''),
    },
    {
      fieldname: '',
      encoding: '',
      originalname: 'uncharted4_art',
      size: 94,
      filename: 'uncharted4_art.jpg',
      mimetype: 'image/jpg',
      stream: Readable.from(['uncharted4_art.jpg']),
      destination: '',
      path: path.join(
        __dirname,
        '..',
        'users',
        'pinPhotos',
        'uncharted4_art.jpg',
      ),
      buffer: Buffer.from(''),
    },
  ];

  const mockUsers: CreateUserDTO<string>[] = [
    {
      username: 'Arkadiy228',
      firstname: 'Arkadiy',
      lastname: 'Skvortsov',
      password: 'somePassword123',
      email: 'mail@mailer.com',
      role: mockRoles[1],
    },
    {
      username: 'SuperPavel',
      firstname: 'Pavel',
      lastname: 'Ostapov',
      password: 'blockchain123',
      email: 'chain@mail.ru',
      role: mockRoles[0],
    },
    {
      username: 'Nagibator123',
      firstname: 'Vasya',
      lastname: 'Pupkob',
      password: 'vasya123',
      email: 'vasyliy@gmail.com',
      role: mockRoles[0],
    },
  ];

  const mockPins: CreatePinDTO[] = [
    {
      id: 1,
      photo: mockPhotos[0],
      author: mockUsers[0],
      title: 'TypeScript logo',
      private: false,
      comments: [],
      description: 'Logo of the programming language',
      tags: ['TypeScript', 'Programming languages', 'Logo'],
    },
    {
      id: 2,
      photo: mockPhotos[1],
      author: mockUsers[1],
      title: 'Solidity logo',
      private: false,
      description: 'Solidity in 100 secs',
      tags: ['Solidity', 'Programming languages', 'Bitcoin', 'Blockchain'],
    },
    {
      id: 3,
      photo: mockPhotos[2],
      author: mockUsers[2],
      title: 'Fresh Meat',
      private: true,
      description: 'Some description',
      tags: ['Fresh Meat', 'Products', 'Logo'],
    },
  ];

  const mockComments: CreateCommentDTO<string>[] = [
    {
      id: 1,
      author: mockPins[0].author,
      pin: mockPins[0],
      date: new Date(),
      text: 'Hello world',
    },
    {
      id: 2,
      author: mockPins[1].author,
      pin: mockPins[1],
      date: new Date(),
      text: 'Hello world #2',
    },
    {
      id: 3,
      author: mockPins[2].author,
      pin: mockPins[2],
      date: new Date(),
      text: 'Hello world #3',
    },
  ];

  const mockHistories: CreateHistoryDTO[] = [
    { author: mockUsers[0], saved_media: mockComments[0] },
    { author: mockUsers[1], saved_media: mockComments[1] },
    { author: mockUsers[2], saved_media: mockComments[2] },
  ];

  const mockNotifications: CreateNotificationDTO<string>[] = [
    {
      author: mockUsers[0],
      text: `Пользователь "${mockUsers[0].username}" оставил комментарий под вашим пином`,
      event: 'Комментарий под пином',
      user: mockUsers[1],
      channel: mockUsers[1].username,
    },
    {
      author: mockUsers[0],
      text: `Пользователь "${mockUsers[0].username}" ответил на ваш комментарий`,
      event: 'Ответ на комментарий',
      channel: mockUsers[1].username,
      user: mockUsers[1],
    },
    {
      author: mockUsers[0],
      text: `Пользователь "${mockUsers[0].username}" лайкнул ваш комменьтарий`,
      event: 'Лайк комментария',
      channel: mockUsers[1].username,
      user: mockUsers[2],
    },
  ];

  const mockPinService = {
    getCurrentPin: jest.fn().mockImplementation((title: string) => {
      const currentPin = mockPins.find((pin) => pin.title === title);

      return currentPin;
    }),
  };

  const mockHistoryService = {
    createNewHistory: jest.fn().mockImplementation((dto: CreateHistoryDTO) => {
      const newHistory = dto;

      mockHistories.push(newHistory);

      return newHistory;
    }),
  };

  const mockNotificationService = {
    notifyAll: jest
      .fn()
      .mockRejectedValueOnce((subscriber: subscriber) => subscriber),
  };

  const mockUsersService = {
    findOne: jest.fn().mockImplementation((username: string) => {
      const currentUser = mockUsers.find(
        (mockUser) => mockUser.username === username,
      );

      return currentUser;
    }),
  };

  const mockCommentsRepository = {
    find: jest.fn().mockReturnValueOnce(mockComments),

    findOne: jest.fn().mockImplementation((id: number) => {
      const currentComment = mockComments.find(
        (mockComment) => mockComment.id === id,
      );

      return currentComment;
    }),

    create: jest.fn().mockImplementation((dto: CreateCommentDTO<string>) => {
      const newComment = dto;

      mockComments.push(newComment);

      return newComment;
    }),

    update: jest
      .fn()
      .mockImplementation((id: number, dto: CreateCommentDTO<string>) => {
        let currentComment = mockCommentsRepository.findOne(id);

        currentComment = dto;

        return currentComment;
      }),

    delete: jest.fn().mockImplementation((id: number) => {
      let currentComment = mockComments.find(
        (mockComment) => mockComment.id === id,
      );

      currentComment = null;

      return currentComment;
    }),

    save: jest
      .fn()
      .mockImplementation(
        (currentComment: CreateCommentDTO<string>) => currentComment,
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        UsersService,
        PinsService,
        JwtTokenService,
        MediaService,
        HistoryService,
        NotificationService,
        { provide: getRepositoryToken(CommentEntity), useValue: {} },
        { provide: getRepositoryToken(UsersEntity), useValue: {} },
        { provide: getRepositoryToken(PinsEntity), useValue: {} },
        { provide: getRepositoryToken(HistoryEntity), useValue: {} },
        { provide: getRepositoryToken(NotificationEntity), useValue: {} },
        { provide: JwtService, useValue: {} },
        { provide: UsersService, useValue: mockUsersService },
        { provide: HistoryService, useValue: mockHistoryService },
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: PinsService, useValue: mockPinService },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    usersService = module.get<UsersService>(UsersService);
    pinsService = module.get<PinsService>(PinsService);
    jwtTokenService = module.get<JwtTokenService>(JwtTokenService);
    mediaService = module.get<MediaService>(MediaService);
    historyService = module.get<HistoryService>(HistoryService);
    notificationService = module.get<NotificationService>(NotificationService);

    commentsRepository = module.get<Repository<CommentEntity>>(
      getRepositoryToken(CommentEntity),
    );
    usersRepository = module.get<Repository<UsersEntity>>(
      getRepositoryToken(UsersEntity),
    );
    pinsRepository = module.get<Repository<PinsEntity>>(
      getRepositoryToken(PinsEntity),
    );
    historyRepository = module.get<Repository<HistoryEntity>>(
      getRepositoryToken(HistoryEntity),
    );
    notificationRepository = module.get<Repository<NotificationEntity>>(
      getRepositoryToken(NotificationEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be get all comments under current pin by his title', async () => {
    try {
      const currentUser = mockUsersService.findOne('Arkadiy228');

      const currentPin = mockPinService.getCurrentPin('Typescript logo');

      const comments = await service.getAllComments(currentPin.title);

      expect(mockUsersService.findOne('Arkadiy228')).resolves.toEqual({
        ...currentUser,
      });
      expect(mockPinService.getCurrentPin()).resolves.toEqual(currentPin);
      expect(await service.getAllComments(currentPin.title)).resolves.toEqual(
        comments,
      );

      expect(mockCommentsRepository).toHaveBeenCalledWith(currentPin.title);

      expect(mockCommentsRepository).toHaveBeenCalledTimes(1);
    } catch (e) {}
  });

  it('should be get current comment by his id under current pin by his title', async () => {
    try {
      const currentUser = mockUsersService.findOne('Arkadiy228');

      const currentPin = mockPinService.getCurrentPin('Typescript logo');

      const currentComment = await service.getCurrentComment(
        1,
        currentPin.title,
        currentUser,
      );

      expect(mockUsersService.findOne('Arkadiy228')).resolves.toEqual(
        currentUser,
      );
      expect(mockPinService.getCurrentPin('Typescript logo')).resolves.toEqual(
        currentPin,
      );
      expect(
        await service.getCurrentComment(1, currentPin.title, currentUser),
      ).resolves.toEqual(currentComment);

      expect(mockCommentsRepository.findOne).toHaveBeenCalledWith(1);

      expect(mockCommentsRepository.findOne).toHaveBeenCalledTimes(1);
    } catch (e) {}
  });

  it('should be create new comment under current pin by his title', async () => {
    try {
      const currentUser = mockUsersService.findOne('Arkadiy228');
      const mockSubscriber = mockUsersService.findOne('SuperPavel');

      const currentPin = mockPinService.getCurrentPin('Typescript logo');

      const commentDTO: CreateCommentDTO<string> = {
        id: 4,
        author: currentUser,
        text: 'My Pin is awesooooome.....',
        pin: currentPin,
        date: new Date(),
      };

      const newComment = await service.createNewCommentUnderPin(
        currentUser,
        currentPin,
        commentDTO,
      );

      const historyDTO: CreateHistoryDTO = {
        author: currentUser,
        saved_media: mockComments[0],
      };

      const subscriber: subscriber<CreateUserDTO<string>> = {
        author: currentUser,
        subscribers: [mockSubscriber],
      };

      const newNotification: CreateNotificationDTO<string> = {
        author: currentUser,
        text: `Пользователь "${currentUser.username}" оставил комментарий под пином ${currentPin.title}`,
        event: 'Комментарий под пином',
        user: subscriber.subscribers.find((sub) => sub.id === 2),
        channel: subscriber.subscribers.find((sub) => sub.id === 2).username,
      };

      const newHistory = mockHistoryService.createNewHistory(historyDTO);

      mockComments.push(commentDTO);
      mockHistories.push(newHistory);
      mockNotifications.push(newNotification);

      expect(mockUsersService.findOne('Arkadiy228')).resolves.toEqual(
        currentUser,
      );
      expect(mockPinService.getCurrentPin('Typescript logo')).resolves.toEqual(
        currentPin,
      );
      expect(
        await service.createNewCommentUnderPin(
          currentUser,
          currentPin,
          commentDTO,
        ),
      ).resolves.toEqual(newComment);
      expect(mockNotificationService.notifyAll(subscriber)).resolves.toEqual(
        subscriber,
      );
      expect(mockHistoryService.createNewHistory(historyDTO)).resolves.toEqual(
        historyDTO,
      );

      expect(mockCommentsRepository.create).toHaveBeenCalledWith(commentDTO);
      expect(mockCommentsRepository.save).toHaveBeenCalledWith(commentDTO);

      expect(mockCommentsRepository.create).toHaveBeenCalledTimes(1);
      expect(mockCommentsRepository.save).toHaveBeenCalledTimes(1);
    } catch (e) {}
  });

  it('should be update a current comment by his id under current pin by his title', async () => {
    try {
      const currentUser = mockUsersService.findOne('Arkadiy228');

      const currentPin = mockPinService.getCurrentPin('Typescript logo');

      const currentComment = await service.getCurrentComment(
        1,
        currentPin.title,
        currentUser,
      );

      const updatedCommentDTO: CreateCommentDTO<string> = {
        text: 'Man, it"s bad pin, delete that pls',
        id: 1,
        author: currentUser.title,
        date: new Date(),
        pin: currentPin,
      };

      const updateCurrentComment = await service.updateCurrentComment(
        currentUser,
        currentPin.title,
        1,
        updatedCommentDTO,
      );

      expect(mockUsersService.findOne('Arkadiy228')).resolves.toEqual(
        currentUser,
      );
      expect(mockPinService.getCurrentPin('Typescript logo')).resolves.toEqual(
        currentPin,
      );
      expect(
        await service.getCurrentComment(1, currentPin.title, currentUser),
      ).resolves.toEqual(currentComment);
      expect(
        await service.updateCurrentComment(
          currentUser,
          currentPin.title,
          1,
          updatedCommentDTO,
        ),
      ).resolves.toEqual(updatedCommentDTO);

      expect(mockCommentsRepository.findOne).toHaveBeenCalledWith(
        'Typescript logo',
      );
      expect(mockCommentsRepository.update).toHaveBeenCalledWith(
        updateCurrentComment,
      );

      expect(mockCommentsRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockCommentsRepository.update).toHaveBeenCalledTimes(1);
    } catch (e) {}
  });

  it('should be reply to the current comment by his id under current pin by his title', async () => {
    try {
      const currentReplier = mockUsersService.findOne('Arkadiy228');
      const currentUser = mockUsersService.findOne('SuperPavel');

      const currentPin = mockPinService.getCurrentPin('Typescript logo');

      const newCommentDTO: CreateCommentDTO<string> = {
        id: 5,
        text: 'No, it"s bullshit, say me ur address man pls..',
        author: currentReplier,
        date: new Date(),
        pin: currentPin.title,
      };

      const currentComment = await service.getCurrentComment(
        2,
        currentPin.title,
        currentReplier,
      );

      const newComment = await service.createNewCommentUnderPin(
        currentReplier,
        currentPin.title,
        newCommentDTO,
      );

      const updatedComment = await service.updateCurrentComment(
        currentUser,
        currentPin.title,
        2,
        newCommentDTO,
      );

      const newHistoryDTO: CreateHistoryDTO = {
        author: currentUser,
        saved_comments: [newCommentDTO],
      };

      const newNotificationDTO: CreateNotificationDTO<string> = {
        text: `Пользователь "${currentReplier.username}" ответил на ваш комментарий под пином "${currentPin.title}"`,
        event: 'Ответ на комментарий',
        author: currentReplier,
        user: currentUser,
        channel: currentUser.username,
      };

      const subscriber: subscriber<CreateUserDTO<string>> = {
        author: currentReplier,
        subscribers: [currentUser],
      };

      mockComments.push(newCommentDTO);
      mockHistories.push(newHistoryDTO);
      mockNotifications.push(newNotificationDTO);

      expect(mockUsersService.findOne('Arkadiy228')).resolves.toEqual(
        mockUsers[0],
      );
      expect(mockUsersService.findOne('SuperPavel')).resolves.toEqual(
        mockUsers[1],
      );
      expect(
        await service.getCurrentComment(2, currentPin.title, currentReplier),
      ).resolves.toEqual(currentComment);
      expect(
        await service.createNewCommentUnderPin(
          currentReplier,
          currentPin.title,
          newCommentDTO,
        ),
      ).resolves.toEqual(newComment);
      expect(
        await service.updateCurrentComment(
          currentUser,
          currentPin.title,
          2,
          newCommentDTO,
        ),
      ).resolves.toEqual(updatedComment);
      expect(mockNotificationService.notifyAll(subscriber)).resolves.toEqual(
        subscriber,
      );
      expect(
        mockHistoryService.createNewHistory(newHistoryDTO),
      ).resolves.toEqual(newHistoryDTO);

      expect(mockCommentsRepository.findOne).toHaveBeenCalledWith(2);
      expect(mockCommentsRepository.create).toHaveBeenCalledWith(newCommentDTO);
      expect(mockCommentsRepository.save).toHaveBeenCalledWith(newComment);
      expect(mockCommentsRepository.update).toHaveBeenCalledWith(2, newComment);

      expect(mockCommentsRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockCommentsRepository.create).toHaveBeenCalledTimes(1);
      expect(mockCommentsRepository.save).toHaveBeenCalledTimes(1);
      expect(mockCommentsRepository.update).toHaveBeenCalledTimes(1);
    } catch (e) {}
  });

  it('should be like a current comment by his id under current pin by his title', async () => {
    try {
      const currentUser = mockUsersService.findOne('Nagibator123');
      const currentLiker = mockUsersService.findOne('Arkadiy228');

      const currentPin = mockPinService.getCurrentPin('Typescript logo');

      const updatedCommentDTO: CreateCommentDTO<string> = {
        id: 3,
        text: 'FFFFF',
        pin: currentPin,
        date: new Date(),
        author: currentUser,
        like: 1,
      };

      const currentComment = await service.getCurrentComment(
        3,
        currentPin.title,
        currentUser,
      );

      const updatedComment = await service.updateCurrentComment(
        currentUser,
        currentPin.title,
        currentComment.id,
        updatedCommentDTO,
      );

      const subscriber: subscriber<CreateUserDTO<string>> = {
        author: currentLiker,
        subscribers: [currentUser],
      };

      const newNotificationDTO: CreateNotificationDTO<string> = {
        author: currentLiker,
        event: 'Лайк комментария',
        text: `Пользователь "${currentLiker.username}" лайкнул ваш комментарий "${currentComment.id}" под пином "${currentPin.title}"`,
        user: currentUser,
        channel: currentUser.username,
      };

      expect(mockUsersService.findOne('Nagibator123')).resolves.toEqual(
        currentUser,
      );
      expect(mockUsersService.findOne('Arkadiy228')).resolves.toEqual(
        currentLiker,
      );
      expect(mockPinService.getCurrentPin('Typescript logo')).resolves.toEqual(
        currentLiker,
      );
      expect(
        await service.getCurrentComment(3, currentPin.title, currentLiker),
      ).resolves.toEqual(currentComment);
      expect(
        await service.updateCurrentComment(
          currentLiker,
          currentPin.title,
          3,
          updatedCommentDTO,
        ),
      ).resolves.toEqual(updatedComment);
      expect(mockNotificationService.notifyAll(subscriber)).resolves.toEqual(
        subscriber,
      );

      expect(mockCommentsRepository.findOne).toHaveBeenCalledWith(3);
      expect(mockCommentsRepository.update).toHaveBeenCalledWith(
        3,
        updatedCommentDTO,
      );

      expect(mockCommentsRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockCommentsRepository.update).toHaveBeenCalledTimes(1);
    } catch (e) {}
  });

  it('should be delete a current comment by his id under current pin by his title', async () => {
    try {
      const currentUser = mockUsersService.findOne('Arkadiy228');

      const currentPin = mockPinService.getCurrentPin('Typescript logo');

      const currentComment = await service.getCurrentComment(
        1,
        currentPin.title,
        currentUser,
      );

      expect(mockUsersService.findOne('Arkadiy228')).resolves.toEqual(
        currentUser,
      );
      expect(mockPinService.getCurrentPin('Typescript logo')).resolves.toEqual(
        currentPin,
      );
      expect(
        await service.getCurrentComment(1, currentPin.title, currentUser),
      ).resolves.toEqual(currentComment);
      expect(
        await service.deleteCurrentComment(currentUser, currentPin.title, 1),
      ).resolves.toEqual(currentComment.id);

      expect(mockCommentsRepository.findOne).toHaveBeenCalledWith(1);
      expect(mockCommentsRepository.delete).toHaveBeenCalledWith(
        currentComment,
      );

      expect(mockCommentsRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockCommentsRepository.delete).toHaveBeenCalledTimes(1);
    } catch (e) {}
  });
});
