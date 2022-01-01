import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Readable } from 'stream';
import * as path from 'path';
import {
  mockUsers,
  mockPins,
  mockHistories,
  mockNotifications,
  mockPhotos,
} from '../../test/data/mock-data';
import HistoryEntity from '../entities/history.entity';
import NotificationEntity from '../entities/notification.entity';
import { HistoryService } from '../history/history.service';
import { NotificationService } from '../notification/notification.service';
import JwtTokenEntity from '../entities/jwt-token.entity';
import PinEntity from '../entities/pin.entity';
import UserEntity from '../entities/users.entity';
import { PinsService } from './pins.service';
import CreateHistoryDTO from '../dto/history.dto';
import CreateNotificationDTO from '../dto/notification.dto';
import CreatePinDTO from '../dto/pin.dto';
import { BoardsService } from '../boards/boards.service';

describe('PinsService', () => {
  let service: PinsService;

  const mockHistoryService = {
    createNewHistory: jest.fn().mockImplementation((dto: CreateHistoryDTO) => {
      mockHistories.push(dto);

      return dto;
    }),
  };

  const mockNotificationService = {};

  const mockPinRepository = {
    find: jest.fn().mockRejectedValue(() => mockPins),
    findOne: jest.fn().mockImplementation((title: string): CreatePinDTO => {
      return mockPins.find((pin) => pin.title === title);
    }),
    create: jest.fn().mockImplementation((dto: CreatePinDTO): CreatePinDTO => {
      mockPins.push(dto);

      return dto;
    }),
    update: jest
      .fn()
      .mockImplementation((title: string, dto: CreatePinDTO): CreatePinDTO => {
        let currentPin = mockPins.find((pin) => pin.title === title);

        currentPin = dto;

        return currentPin;
      }),
    delete: jest.fn().mockImplementation((title: string): number => {
      const currentPin = mockPins.find((pin) => pin.title === title);

      mockPins.splice(currentPin.id, 1);

      return currentPin.id;
    }),
    save: jest.fn().mockRejectedValue((dto: CreatePinDTO) => dto),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PinsService,
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: BoardsService, useValue: {} },
        { provide: HistoryService, useValue: mockHistoryService },
        { provide: getRepositoryToken(UserEntity), useValue: {} },
        { provide: getRepositoryToken(PinEntity), useValue: mockPinRepository },
        { provide: getRepositoryToken(JwtTokenEntity), useValue: {} },
        { provide: getRepositoryToken(NotificationEntity), useValue: {} },
        { provide: getRepositoryToken(HistoryEntity), useValue: {} },
      ],
    }).compile();

    service = module.get<PinsService>(PinsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be get all pins in application', async () => {
    try {
      expect(await service.getAllPins()).resolves.toEqual(mockPins);

      expect(mockPinRepository.find).toHaveReturnedWith(mockPins);

      expect(mockPinRepository.find).toHaveBeenCalledTimes(1);
    } catch (e) {
      console.log(e);
    }
  });

  it('should be get a current pin by his title', async () => {
    try {
      await expect(service.getCurrentPin('Mario art')).rejects.toEqual(
        mockPins[0],
      );

      expect(mockPinRepository.findOne).toHaveBeenCalledWith(mockPins[0].title);

      expect(mockPinRepository.findOne).toHaveBeenCalledTimes(1);
    } catch (e) {
      console.log(e);
    }
  });

  it('should be create a new pin', async () => {
    try {
      const newPin: CreatePinDTO = {
        id: 3,
        title: 'Arthur killed moose 🧛',
        description:
          'Red dead redemption 2: Arthur Morgan had killed a Moose animal',
        author: mockUsers[0],
        photo: mockPhotos[6],
        tags: ['RDR2', 'Art', 'Game', 'Rockstar Games', 'Moose'],
      };

      expect(await service.createNewPin(mockUsers[0], newPin)).resolves.toEqual(
        newPin,
      );

      expect(mockPinRepository.create).toHaveBeenCalledWith(newPin);
      expect(mockPinRepository.save).toHaveBeenCalledWith(newPin);

      expect(mockPinRepository.create).toHaveBeenCalledTimes(1);
      expect(mockPinRepository.save).toHaveBeenCalledTimes(1);
    } catch (e) {
      console.log(e);
    }
  });

  it('should be change visibility of the current pin', async () => {
    try {
      await expect(
        service.changeVisibility(mockUsers[0], mockPins[0].title, true),
      ).resolves.toEqual(mockPins[0]);

      expect(mockPinRepository.update).toHaveBeenCalledWith(mockPins[0].title, {
        visibility: false,
      });

      expect(mockPinRepository.update).toHaveBeenCalledTimes(1);
    } catch (e) {
      console.log(e);
    }
  });

  it('should be update a current pin by title through user permission', async () => {
    try {
      const mockPhoto = {
        fieldname: '',
        encoding: 'base64',
        originalname: 'arthur-morgan.jpg',
        size: 88,
        filename: 'arthur-morgna.jpg',
        mimetype: 'image/jpg',
        stream: Readable.from(['arthur-morgan.jpg']),
        destination: '',
        path: path.join(
          __dirname,
          '..',
          'assets',
          'pinPhotos',
          'arthur-morgan.jpg',
        ),
        buffer: Buffer.from(''),
      };

      const updatedPin: CreatePinDTO = {
        id: 1,
        title: 'Arthur Morgan before he died...',
        description: 'Cool Arthur Morgan art from Red Dead Redemption II 🤠',
        author: mockUsers[0],
        photo: mockPhoto,
        tags: ['RDR2', 'Arthur Morgan', 'Rockstar Games'],
      };

      expect(
        await service.updateCurrentPin(mockUsers[0], mockPins[2], updatedPin),
      ).resolves.toEqual(updatedPin);

      expect(mockPinRepository.update).toHaveBeenCalledWith(
        mockPins[2].title,
        updatedPin,
      );

      expect(mockPinRepository.update).toHaveBeenCalledTimes(1);
    } catch (e) {
      console.log(e);
    }
  });

  it('should be delete a current pin by his title through user permission', async () => {
    try {
      expect(
        await service.deleteCurrentPin(mockUsers[0], mockPins[0].title),
      ).resolves.toEqual(mockPins[0].id);

      expect(mockPinRepository.delete).toHaveBeenCalledWith(mockPins[0].title);

      expect(mockPinRepository.delete).toHaveBeenCalledTimes(1);
    } catch (e) {
      console.log(e);
    }
  });
});
