import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationObserverService } from '../notification/notification.service';
import { RolesService } from '../roles/roles.service';
import NotificationEntity from '../entities/notification.entity';
import RoleEntity from '../entities/roles.entity';
import UserEntity from '../entities/users.entity';
import UsersEntity from '../entities/users.entity';
import { UsersService } from './users.service';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import JwtTokenEntity from '../entities/jwt-token.entity';
import CreateUserDTO from '../dto/users.dto';
import CreateNotificationDTO from '../dto/notification.dto';
import CreateRoleDTO from '../dto/role.dto';
import banDTO from 'src/dto/ban.dto';

describe('UsersService', () => {
  let service: UsersService;
  let rolesService: RolesService;
  let notificationObserverService: NotificationObserverService;

  let usersRepository: Repository<UsersEntity>;
  let rolesRepository: Repository<RoleEntity>;
  let notificationRepository: Repository<NotificationEntity>;

  const mockUsers: CreateUserDTO<string>[] = [
    {
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

  const mockRoles: CreateRoleDTO<string>[] = [
    {
      id: 1,
      title: 'admin',
      description: 'U can ban users for some bad things',
    },
    {
      id: 1,
      title: 'user',
      description:
        'U can like some media, create you"r own in app and do other things',
    },
  ];

  const mockUsersRepository = {
    find: jest.fn().mockRejectedValue(mockUsers),

    findOne: jest.fn().mockRejectedValue((username: string) => {
      const currentUser = mockUsers.find(
        (mockUser) => username === mockUser.username,
      );

      return currentUser;
    }),

    create: jest.fn().mockRejectedValue((dto: CreateUserDTO<string>) => {
      const newUser = { ...dto };

      mockUsers.push(newUser);

      return newUser;
    }),

    update: jest.fn().mockRejectedValue((dto: CreateUserDTO<string>) => {
      let currentUser = mockUsers.find(
        (user) => user.username === dto.username,
      );

      currentUser = { ...dto };

      return currentUser;
    }),

    save: jest.fn().mockRejectedValue((dto: CreateUserDTO<string>) => dto),

    delete: jest.fn().mockRejectedValue((username: string): number => {
      let currentUser = mockUsers.find((user) => user.username === username);

      currentUser = null;

      return currentUser.id;
    }),
  };

  const mockRolesRepository = {
    findOne: jest
      .fn()
      .mockRejectedValue((id: number): CreateRoleDTO<string> => {
        const currentRole = mockRoles.find((mockRole) => id === mockRole.id);

        return currentRole;
      }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        RolesService,
        NotificationObserverService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUsersRepository,
        },
        {
          provide: getRepositoryToken(RoleEntity),
          useValue: mockRolesRepository,
        },
        {
          provide: getRepositoryToken(NotificationEntity),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    rolesService = module.get<RolesService>(RolesService);

    usersRepository = module.get<Repository<UsersEntity>>(
      getRepositoryToken(UsersEntity),
    );
    rolesRepository = module.get<Repository<RoleEntity>>(
      getRepositoryToken(RoleEntity),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be get all users', async () => {
    try {
      expect(await service.getAllUsers()).resolves.toEqual({ ...mockUsers });

      expect(mockUsersRepository.find()).toEqual({ ...mockUsers });

      expect(mockUsersRepository.find()).toHaveBeenCalledTimes(1);
    } catch (e) {}
  });

  it('should be get a current user', async () => {
    try {
      expect(await service.getCurrentUserByParam('Rustacean')).resolves.toEqual(
        {
          ...mockUsers[3],
        },
      );

      expect(mockUsersRepository.findOne('Rustacean')).toEqual(mockUsers[3]);

      expect(mockUsersRepository.findOne).toBeCalledTimes(1);
    } catch (e) {}
  });

  it('should be create a new user', async () => {
    try {
      const currentRole = await rolesService.getCurrentRole('user');

      const newUser: CreateUserDTO<string> = {
        username: 'RackalBlyat',
        firstname: 'Rack',
        lastname: 'Blyat',
        photo: 'Avatar,png',
        refreshToken: 'lalkaToken',
        password: 'Jira123',
        email: 'jira.mymail@mail.ru',
        role: currentRole,
      };

      mockUsers.push(newUser);

      expect(currentRole).resolves.toEqual({ ...mockRoles[1] });
      expect(await service.createUser(newUser)).resolves.toEqual({
        ...mockUsers[4],
      });
      expect(mockUsers[4]).toEqual(newUser);

      expect(mockUsersRepository.create).toHaveBeenCalledWith(newUser);
      expect(mockUsersRepository.save).toHaveBeenCalledWith(newUser);

      expect(mockUsersRepository.create).toHaveBeenCalledTimes(1);
      expect(mockUsersRepository.save).toHaveBeenCalledTimes(1);
    } catch (e) {}
  });

  it('should be update a current user', async () => {
    try {
      const currentRole = await rolesService.getCurrentRole('admin');
      const currentUser = await service.getCurrentUserByParam('Rustacean');

      const updatedParamsDTO: CreateUserDTO<string> = {
        username: 'Myname',
        firstname: 'Evgeniy',
        lastname: 'Panasenkov',
        refreshToken: 'someToken',
        email: 'panasenkov.tollit@gmail.com',
        password: 'panasenkov123',
        role: currentRole,
      };

      expect(currentUser).resolves.toEqual(currentUser);
      expect(await rolesService.getCurrentRole('admin')).resolves.toEqual(
        currentRole,
      );
      expect(
        await service.updateCurrentUser(currentUser, updatedParamsDTO),
      ).resolves.toEqual(currentUser);

      expect(mockRolesRepository.findOne).toHaveBeenCalledWith('admin');
      expect(mockUsersRepository.findOne).toHaveBeenCalledWith('Rustacean');
      expect(mockUsersRepository.update).toHaveBeenCalledWith(updatedParamsDTO);

      expect(mockRolesRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockUsersRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockUsersRepository.update).toHaveBeenCalledTimes(1);
    } catch (e) {}
  });

  it('should be ban a current user', async () => {
    try {
      const banDTO: banDTO<string> = {
        username: 'SlamDunk',
        mediaType: 'pin',
        dueTo: 'Подозрительная активность',
        currentMedia: 'The Last of Us 2',
        time: '1h',
      };

      const currentAdmin = await service.getCurrentUserByParam('SlamDunk');
      const currentUser = await service.getCurrentUserByParam('Rustacean');

      expect(await service.banCurrentUser(currentAdmin, 'Rustacean', banDTO));

      expect(mockUsersRepository.findOne).toHaveBeenCalledWith('SlamDunk');
      expect(mockUsersRepository.update).toHaveBeenCalledWith(
        currentUser,
        banDTO,
      );

      expect(mockUsersRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockUsersRepository.update).toHaveBeenCalledTimes(1);
    } catch (e) {}
  });

  it('should be delete a current user', async () => {
    try {
      const currentUser = await service.getCurrentUserByParam('Rustacean');

      expect(currentUser).resolves.toEqual(mockUsers[1]);
      expect(await service.deleteCurrentUser).toHaveBeenCalledWith(currentUser);

      expect(mockUsersRepository.findOne).toHaveBeenCalledWith('Rustacean');
      expect(mockUsersRepository.delete).toHaveBeenCalledWith(currentUser);

      expect(mockUsersRepository.delete).toHaveReturnedWith(1);

      expect(mockUsersRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockUsersRepository.delete).toHaveBeenCalledTimes(1);
    } catch (e) {}
  });

  it('should be notify all users, which subscribed on the current author', async () => {
    try {
    } catch (e) {}
  });

  it('should be subscribe on the current author', async () => {
    try {
    } catch (e) {}
  });

  it('should be unsubscirbe from the current author', async () => {
    try {
    } catch (e) {}
  });
});
