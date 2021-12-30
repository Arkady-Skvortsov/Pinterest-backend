import { Test, TestingModule } from '@nestjs/testing';
import { mockUsers } from '../../test/data/mock-data';
import { mockRoles } from '../../test/data/mock-data';
import { subscriber } from '../dto/notification.dto';
import { Roles } from '../decorators/roles.decorator';
import banDTO from '../dto/ban.dto';
import CreateUserDTO from '../dto/users.dto';
import UserEntity from '../entities/users.entity';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    getAllUsers: jest.fn().mockResolvedValue(mockUsers),

    getCurrentUserByParams: jest
      .fn()
      .mockImplementation((username: string): CreateUserDTO<string> => {
        const currentUser = mockUsers.find(
          (mockUser) => mockUser.username === username,
        );

        return currentUser;
      }),

    createNewUser: jest
      .fn()
      .mockImplementation(
        (dto: CreateUserDTO<string>): CreateUserDTO<string> => {
          mockUsers.push(dto);

          return dto;
        },
      ),

    updateCurrentUser: jest
      .fn()
      .mockImplementation(
        (
          user: UserEntity,
          dto: CreateUserDTO<string>,
          photo: Express.Multer.File,
        ): CreateUserDTO<string> => {
          let currentUser = mockUsers.find((mockUser) => mockUser === user);

          currentUser = dto;

          return currentUser;
        },
      ),

    banCurrentUser: jest
      .fn()
      .mockImplementation(
        (
          dto: CreateUserDTO<string>,
          username: string,
          banDTO: banDTO<string>,
        ): CreateUserDTO<string> => {
          const currentUser = mockUsers.find(
            (user) => user.username === username,
          );

          currentUser.banDTO = banDTO;

          currentUser.isBan
            ? (currentUser.isBan = false)
            : (currentUser.isBan = true);

          return currentUser;
        },
      ),

    deleteCurrentUser: jest
      .fn()
      .mockImplementation((user: CreateUserDTO<string>): number => {
        let currentUser = mockUsers.find((mockUser) => mockUser === user);

        currentUser = null;

        return currentUser.id;
      }),

    subscribe: jest
      .fn()
      .mockImplementation(
        (
          user: UserEntity,
          authorName: string,
        ): subscriber<CreateUserDTO<string>> => {
          const currentUser = mockUsers.find((mockUser) => mockUser === user);
          const currentAuthor = mockUsers.find(
            (mockAuthor) => mockAuthor.username === authorName,
          );

          const subscriber: subscriber<CreateUserDTO<string>> = {
            author: currentAuthor,
            subscribers: [currentUser],
          };

          return subscriber;
        },
      ),

    unsubscribe: jest
      .fn()
      .mockImplementation((user: UserEntity, authorName: string) => {
        const currentUser = mockUsers.find((mockUser) => mockUser === user);
        const currentAuthor = mockUsers.find(
          (mockAuthor) => mockAuthor.username === authorName,
        );
      }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        {
          provide: AuthGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
        {
          provide: RolesGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
        {
          provide: Roles,
          useValue: jest.fn().mockImplementation(() => 'admin'),
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be get all users', async () => {
    try {
      expect(await controller.getAllUsers).resolves.toEqual({ ...mockUsers });

      expect(mockUsersService.getAllUsers).resolves.toEqual({ ...mockUsers });

      expect(mockUsersService.getAllUsers).toHaveBeenCalledTimes(1);
    } catch (e) {}
  });

  it('should be update a current user', async () => {
    try {
      const currentUser = mockUsersService.getCurrentUserByParams('SlamDunk');

      const dto: CreateUserDTO<string> = {
        username: 'SomeName',
        firstname: 'nameFirst',
        lastname: 'nameLast',
        password: 'somePassword',
        email: 'slam@mail.ru',
        role: mockRoles[0],
      };

      expect(
        await controller.updateCurrentUser(currentUser, dto),
      ).resolves.toEqual({ ...dto });

      expect(mockUsersService.updateCurrentUser).toHaveBeenCalledWith(
        currentUser,
        dto,
      );

      expect(mockUsersService.updateCurrentUser).toBeCalledTimes(1);
    } catch (e) {}
  });

  it('should be ban a current user', async () => {
    try {
      const banDTO: banDTO<string> = {
        username: 'Rustacean',
        time: '1h',
        currentMedia: 'The last of us 2',
        mediaType: 'pin',
        dueTo: 'Подозрительная активность',
      };

      const currentUser = 'SlamDunk';
      const action =
        `разбанен, обвинения по причине "${banDTO.dueTo}" сняты` ??
        `забанен по причине "${banDTO.dueTo}"`;
      const currentAdmin = mockUsersService.getCurrentUserByParams('Rustacean');

      expect(
        await controller.banCurrentUser(currentAdmin, currentUser, banDTO),
      ).resolves.toEqual(`Пользователь ${currentUser} ${action}`);

      expect(mockUsersService.banCurrentUser).toHaveBeenCalledWith(
        currentAdmin,
        currentUser,
        banDTO,
      );

      expect(mockUsersService.banCurrentUser).toHaveBeenCalledTimes(1);
    } catch (e) {}
  });

  it('should be subscribe on the current author', async () => {
    try {
    } catch (e) {}
  });

  it('should be unsubscribed from current author', async () => {
    try {
    } catch (e) {}
  });
});
