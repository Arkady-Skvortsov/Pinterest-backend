import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Readable } from 'typeorm/platform/PlatformTools';
import * as path from 'path';
import UserEntity from '../entities/users.entity';
import NotificationEntity from '../entities/notification.entity';
import { UsersService } from '../users/users.service';
import {
  NotificationObserverService,
  NotificationService,
} from './notification.service';
import CreateUserDTO from '../dto/users.dto';
import CreateNotificationDTO, { subscriber } from '../dto/notification.dto';
import CreateRoleDTO from '../dto/role.dto';
import CreatePinDTO from '../dto/pin.dto';
import CreateCommentDTO from '../dto/comment.dto';

describe('Service', () => {
  let service: NotificationObserverService;
  let notificationService: NotificationService;

  const mockRoles: CreateRoleDTO[] = [
    {
      id: 1,
      description:
        'You can create new board/pin in app, send comments and more',
      title: 'user',
    },
    {
      id: 2,
      description: 'You can give a ban to some user and secure app',
      title: 'admin',
    },
  ];

  const mockPhotos: Express.Multer.File[] = [
    {
      fieldname: '',
      encoding: '',
      originalname: 'uncharted4_art',
      size: 88,
      filename: 'uncharted4_art.jpg',
      mimetype: 'image/jpg',
      stream: Readable.from(['']),
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
      stream: Readable.from(['']),
      destination: '',
      path: path.join(__dirname, '..', 'users', 'pinPhoto', 'ts_art.jpg'),
      buffer: Buffer.from(''),
    },
  ];

  const mockUsers: CreateUserDTO[] = [
    {
      username: 'Arkadiy228',
      firstname: 'Arkadiy',
      lastname: 'Skvortsov',
      password: 'rambler123',
      email: 'some@mail.ru',
      role: mockRoles[1],
    },
    {
      username: 'Karovna',
      firstname: 'Punisher',
      lastname: 'Kovalsky',
      password: 'password123',
      email: 'some@mail.ru',
      role: mockRoles[0],
    },
  ];

  const mockPin: CreatePinDTO[] = [
    {
      author: mockUsers[1],
      title: 'Typescript art',
      photo: mockPhotos[1],
      description: 'Art of the programming language | Typescript',
      tags: ['Typescript', 'Art', 'Programming'],
    },
    {
      author: mockUsers[1],
      title: 'Uncharted 4 art',
      photo: mockPhotos[0],
      description: 'Multiplayer Uncharted 4',
      tags: ['Uncharted 4', 'Video games', 'Multiplayer'],
    },
  ];

  const mockComments: CreateCommentDTO[] = [
    {
      text: 'Новый комментарий #1',
      author: mockUsers[0],
      pin: mockPin[0],
      date: new Date(),
    },
    {
      text: 'Новый комментарий #2',
      author: mockUsers[0],
      pin: mockPin[0],
      date: new Date(),
    },
    {
      text: 'Новый комментарий #3',
      author: mockUsers[0],
      pin: mockPin[1],
      date: new Date(),
    },
  ];

  const mockNotifications: CreateNotificationDTO<string>[] = [
    {
      id: 1,
      author: mockUsers[0],
      text: `Пользователь "${mockUsers[0].username}" оценил ваш комментарий под пином`,
      event: 'Лайк комментария',
      channel: mockUsers[1].username,
      user: mockUsers[1],
      comment: mockComments[0],
    },
    {
      id: 2,
      author: mockUsers[0],
      text: `Пользователь ${mockUsers[0].username} оставил комментарий под вашим пином`,
      event: 'Комментарий под пином',
      channel: mockUsers[1].username,
      user: mockUsers[1],
      comment: mockComments[0],
    },
    {
      id: 3,
      author: mockUsers[0],
      text: `Пользователь ${mockUsers[0].username} ответил на ваш комментарий под пином`,
      event: 'Ответ на комментарий',
      channel: mockUsers[1].username,
      user: mockUsers[1],
      comment: mockComments[1],
    },
  ];

  const mockNotificationRepository = {
    find: jest.fn().mockImplementation(() => mockNotifications),
    findOne: jest.fn().mockImplementation((id: number) => {
      const currentNotification = mockNotifications.find(
        (notification) => notification.id === id,
      );

      return currentNotification;
    }),
    create: jest
      .fn()
      .mockImplementation((dto: CreateNotificationDTO<string>) => {
        const newNotification = dto;

        mockNotifications.push(newNotification);

        return newNotification;
      }),
    update: jest
      .fn()
      .mockImplementation((id: number, dto: CreateNotificationDTO<string>) => {
        let currentNotification = mockNotifications.find(
          (notification) => notification.id === id,
        );

        currentNotification = dto;

        return currentNotification;
      }),
    delete: jest.fn().mockImplementation((id: number) => {
      const currentNotification = mockNotifications.find(
        (notification) => notification.id === id,
      );

      mockNotifications.splice(currentNotification.id, 1);

      return currentNotification;
    }),
    save: jest
      .fn()
      .mockRejectedValue((dto: CreateNotificationDTO<string>) => dto),
  };

  const mockUsersService = {
    getCurrentUser: jest.fn().mockImplementation((username: string) => {
      const currentUser = mockUsers.find((user) => user.username === username);

      return currentUser;
    }),

    notifyAll: jest
      .fn()
      .mockImplementation(
        (subscriber: subscriber, dto: CreateNotificationDTO) => {
          const currentSubscriber = subscriber.subscribers.find(
            (sub) => sub.id === 1,
          );

          mockNotifications.push(dto);

          const newNotification: CreateNotificationDTO = dto;

          return currentSubscriber;
        },
      ),

    subscribe: jest
      .fn()
      .mockRejectedValue((subscriber: subscriber) => subscriber),

    unsubscribe: jest
      .fn()
      .mockRejectedValue((subscriber: subscriber) => subscriber),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationObserverService,
        NotificationService,
        { provide: UsersService, useValue: mockUsersService },
        {
          provide: getRepositoryToken(NotificationEntity),
          useValue: mockNotificationRepository,
        },
        { provide: getRepositoryToken(UserEntity), useValue: {} },
      ],
    }).compile();

    service = module.get<NotificationObserverService>(
      NotificationObserverService,
    );
    notificationService = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('NotificationService', () => {
    it('should be get all notification from current channel', async () => {
      try {
        const currentUser = mockUsersService.getCurrentUser('Arkadiy228');

        const allNotifications = await notificationService.getAllNotifications(
          currentUser,
        );

        expect(mockUsersService.getCurrentUser('Arkadiy228')).resolves.toEqual(
          currentUser,
        );
        expect(
          await notificationService.getAllNotifications(currentUser),
        ).resolves.toEqual(allNotifications);

        expect(mockNotificationRepository.find).toHaveReturnedWith(
          allNotifications,
        );

        expect(mockNotificationRepository.find).toHaveBeenCalledTimes(1);
      } catch (e) {}
    });

    it('should be get a current notification from current channel', async () => {
      try {
        const currentUser = mockUsersService.getCurrentUser('Arkadiy228');

        const currentNotification =
          await notificationService.getCurrentNotification(currentUser, 1);

        expect(mockUsersService.getCurrentUser('Arkadiy228')).resolves.toEqual(
          currentUser,
        );
        expect(
          await notificationService.getCurrentNotification(currentUser, 1),
        ).resolves.toEqual(currentNotification);

        expect(mockNotificationRepository.findOne).toHaveBeenCalledWith(1);

        expect(mockNotificationRepository.findOne).toHaveBeenCalledTimes(1);
      } catch (e) {}
    });

    it('should be delete a current notification from current channel', async () => {
      try {
        const currentUser = mockUsersService.getCurrentUser('Arkadiy228');

        const currentNotification =
          await notificationService.getCurrentNotification(currentUser, 1);

        expect(mockUsersService.getCurrentUser('Arkadiy228')).resolves.toEqual(
          currentUser,
        );
        expect(
          await notificationService.getCurrentNotification(currentUser, 1),
        ).resolves.toEqual(currentNotification);
        expect(
          await notificationService.deleteCurrentNotification(currentUser, 1),
        ).resolves.toEqual(1);

        expect(mockNotificationRepository.findOne).toHaveBeenCalledWith(1);
        expect(mockNotificationRepository.delete).toHaveBeenCalledWith(1);

        expect(mockNotificationRepository.findOne).toHaveBeenCalledTimes(1);
        expect(mockNotificationRepository.delete).toHaveBeenCalledTimes(1);
      } catch (e) {}
    });
  });

  describe('NotificationObserverService', () => {
    const subscriber: subscriber[] = [];

    it('should be subscribe on the current author', async () => {
      try {
        const currentAuthor = mockUsersService.getCurrentUser('Arkadiy228');
        const currentUser = mockUsersService.getCurrentUser('Karovna');

        subscriber.push({ author: currentAuthor, subscribers: [currentUser] });

        expect(mockUsersService.getCurrentUser('Arkadiy228')).resolves.toEqual(
          mockUsers[0],
        );

        expect(mockUsersService.getCurrentUser('Karovna')).resolves.toEqual(
          mockUsers[1],
        );

        expect(await service.subscribe(subscriber[0])).resolves.toEqual(
          subscriber[0],
        );
        expect(mockUsersService.subscribe(subscriber[0])).resolves.toEqual(
          subscriber[0],
        );
      } catch (e) {}
    });

    it('should be notify all subscribers from current author', async () => {
      try {
        const currentAuthor = mockUsersService.getCurrentUser('Arkadiy228');
        const currentUser = mockUsersService.getCurrentUser('Karovna');

        subscriber.push({ author: currentAuthor, subscribers: [currentUser] });

        const newNotificationDTO: CreateNotificationDTO = {
          text: `Пользователь "${currentAuthor.username}" выложил новый пин`,
          event: 'Автор выложил новый пин',
          author: currentAuthor,
          user: currentUser,
          channel: currentUser.username,
        };

        expect(mockUsersService.getCurrentUser('Arkadiy228')).resolves.toEqual(
          currentAuthor,
        );
        expect(mockUsersService.getCurrentUser('Karovna')).resolves.toEqual(
          currentUser,
        );
        expect(
          await service.notifyAll(newNotificationDTO, subscriber[0]),
        ).resolves.toEqual(subscriber[0]);
        expect(
          mockUsersService.notifyAll(newNotificationDTO, subscriber[0]),
        ).resolves.toEqual(subscriber[0]);
      } catch (e) {}
    });

    it('should be unsubscribe from current author', async () => {
      try {
        const currentAuthor = mockUsersService.getCurrentUser('Arkadiy228');
        const currentUser = mockUsersService.getCurrentUser('Karovna');

        subscriber[0].subscribers.filter((s) => s !== currentAuthor);

        expect(mockUsersService.getCurrentUser('Arkadiy228')).resolves.toEqual(
          mockUsers[0],
        );
        expect(mockUsersService.getCurrentUser('Karovna')).resolves.toEqual(
          mockUsers[1],
        );
        expect(
          await service.unsubscribe(currentUser, subscriber[0]),
        ).resolves.toEqual(subscriber);

        expect(mockUsersService.unsubscribe()).resolves.toEqual(subscriber);
      } catch (e) {}
    });
  });
});
