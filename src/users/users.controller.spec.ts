import { Test, TestingModule } from '@nestjs/testing';
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

  const mockUsers: CreateUserDTO<string>[] = [
    {
      id: 1,
      username: 'SlamDunk',
      firstname: 'Arkadiy',
      lastname: 'Skvortsov',
      password: 'password123',
      email: 'povar.arkaduyshka@gmail.com',
      photo: 'Arkadiy.jpg',
      role: 'admin',
      refreshToken: '12494hi23oifelibilwhwjy',
    },
    {
      id: 2,
      username: 'Ezhik',
      firstname: 'Sergey',
      lastname: 'Utkin',
      password: 'starec223',
      email: 'stariy.matros@mail.ru',
      photo: 'Ezhik.jpg',
      role: 'user',
      refreshToken: '12694hi13oifelhbiawhbjy',
    },
    {
      id: 3,
      username: 'JSlover',
      firstname: 'Dmitry',
      lastname: 'Konev',
      password: 'naletchik228',
      email: 'povar.arkaduyshka@gmail.com',
      photo: 'Konev.png',
      role: 'user',
      refreshToken: '12371hi23offalzbirwhgjj',
    },
    {
      id: 4,
      username: 'Rustacean',
      firstname: 'Rust',
      lastname: 'Lover',
      password: 'Draker998',
      email: 'nathan.drake@mail.ru',
      photo: 'Rust.gif',
      role: 'admin',
      refreshToken: '12a94et21offazibirw5wyy',
    },
    {
      id: 5,
      username: 'StarButterfly',
      firstname: 'Star',
      lastname: 'Butterfly',
      password: 'markosterpel2raza',
      email: 'butterfly.marko-domination@gmail.com',
      photo: 'Marko.png',
      role: 'admin',
      refreshToken: '11474ha19oifabibilkhljv',
    },
  ];

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
        role: 'admin',
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
