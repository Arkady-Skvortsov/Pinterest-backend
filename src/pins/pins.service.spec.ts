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

  const mockHistoryService = {};

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
    } catch (e) {
      console.log(e);
    }
  });

  it('should be get a current pin by his title', async () => {
    try {
    } catch (e) {
      console.log(e);
    }
  });

  it('should be create a new pin', async () => {
    try {
    } catch (e) {
      console.log(e);
    }
  });

  it('should be change visibility of the current pin', async () => {
    try {
    } catch (e) {
      console.log(e);
    }
  });

  it('should be update a current pin by title through user permission', async () => {
    try {
    } catch (e) {
      console.log(e);
    }
  });

  it('should be delete a current pin by his title through user permission', async () => {
    try {
    } catch (e) {
      console.log(e);
    }
  });
});
