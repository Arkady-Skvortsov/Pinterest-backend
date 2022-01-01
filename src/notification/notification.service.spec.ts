import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Readable } from 'typeorm/platform/PlatformTools';
import * as path from 'path';
import {
  mockPhotos,
  mockUsers,
  mockPins,
  mockComments,
  mockNotifications,
} from '../../test/data/mock-data';
import UserEntity from '../entities/users.entity';
import NotificationEntity from '../entities/notification.entity';
import { UsersService } from '../users/users.service';
import {
  NotificationObserverService,
  NotificationService,
} from './notification.service';
import CreateNotificationDTO, { subscriber } from '../dto/notification.dto';

describe('Service', () => {
  let service: NotificationObserverService;
  let notificationService: NotificationService;

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
        {
          provide: getRepositoryToken(NotificationEntity),
          useValue: mockNotificationRepository,
        },
        { provide: getRepositoryToken(UserEntity), useValue: {} },
        { provide: UsersService, useValue: {} },
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
