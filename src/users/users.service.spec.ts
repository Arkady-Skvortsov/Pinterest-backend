import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { RolesService } from '../roles/roles.service';
import RoleEntity from '../entities/roles.entity';
import UserEntity from '../entities/users.entity';
import UsersEntity from '../entities/users.entity';
import { UsersService } from './users.service';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import JwtTokenEntity from '../entities/jwt-token.entity';
import CreateUserDTO from '../dto/users.dto';
import CreateNotificationDTO, { subscriber } from '../dto/notification.dto';
import { CreatePaylodDTO } from '../dto/token.dto';
import CreateRoleDTO from '../dto/role.dto';
import banDTO from '../dto/ban.dto';
import { UserSettingsService } from '../user-settings/user-settings.service';
import AccountSettingsEntity from '../entities/account-settings.entity';

describe('UsersService', () => {
  let service: UsersService;
  let jwtTokenService: JwtTokenService;
  let rolesService: RolesService;

  let usersRepository: Repository<UsersEntity>;
  let rolesRepository: Repository<RoleEntity>;
  let jwtTokenRepository: Repository<JwtTokenEntity>;

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

  const mockAccountSettings = {};

  const mockRoles: CreateRoleDTO<string>[] = [
    {
      id: 1,
      title: 'admin',
      description: 'U can ban users for some bad things',
    },
    {
      id: 2,
      title: 'user',
      description:
        'U can like some media, create you"r own in app and do other things',
    },
  ];

  const mockJwtTokenService = {
    generateToken: jest
      .fn()
      .mockImplementation((dto: CreateUserDTO<string>) => {
        const payload: CreatePaylodDTO<string> = {
          username: dto.username,
          role: dto.role,
        };

        const token = {
          refreshToken: `${payload}`,
        };

        const newToken = mockJwtTokenService.createToken(token.refreshToken);

        return newToken;
      }),

    createToken: jest.fn().mockReturnValueOnce((token: string) => token),
  };

  const mockRolesService = {
    getCurrentRole: jest
      .fn()
      .mockImplementation((title: string): CreateRoleDTO<string> => {
        const currentRole = mockRoles.find((role) => role.title === title);

        return currentRole;
      }),
  };

  const mockUsersSettingsService = {
    getCurrentSettings: jest.fn().mockImplementation(),
    updateCurrentSettings: jest.fn().mockImplementation(),
  };

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
        JwtTokenService,
        JwtService,
        UserSettingsService,
        {
          provide: JwtService,
          useValue: {},
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUsersRepository,
        },
        {
          provide: getRepositoryToken(RoleEntity),
          useValue: mockRolesRepository,
        },
        {
          provide: getRepositoryToken(JwtTokenEntity),
          useValue: mockJwtTokenService,
        },
        {
          provide: getRepositoryToken(AccountSettingsEntity),
          useValue: mockUsersSettingsService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    rolesService = module.get<RolesService>(RolesService);
    jwtTokenService = module.get<JwtTokenService>(JwtTokenService);

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

      expect(mockUsersRepository.find).rejects.toEqual({ ...mockUsers });

      expect(mockUsersRepository.find).toHaveBeenCalledTimes(1);
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
      const currentRole = mockRolesService.getCurrentRole('user');

      const newUser: CreateUserDTO<string> = {
        username: 'RackalBlyat',
        firstname: 'Rack',
        lastname: 'Blyat',
        photo: 'Avatar.png',
        password: 'Jira123',
        email: 'jira.mymail@mail.ru',
        role: currentRole,
      };

      const newToken = mockJwtTokenService.generateToken(newUser);

      newUser.refreshToken = newToken;

      mockUsers.push(newUser);

      expect(currentRole).resolves.toEqual({ ...mockRoles[1] });
      expect(newToken).resolves.toEqual('F');
      expect(await service.createUser(newUser)).resolves.toEqual({
        ...mockUsers[4],
      });

      expect(mockUsersRepository.create).toHaveBeenCalledWith(newUser);
      expect(mockUsersRepository.save).toHaveBeenCalledWith(newUser);

      expect(mockUsersRepository.create).toHaveBeenCalledTimes(1);
      expect(mockUsersRepository.save).toHaveBeenCalledTimes(1);
    } catch (e) {}
  });

  it('should be update a current user', async () => {
    try {
      const currentRole = mockRolesService.getCurrentRole('admin');
      const currentUser = await service.getCurrentUserByParam('Rustacean');

      const updatedParamsDTO: CreateUserDTO<string> = {
        username: 'Myname',
        firstname: 'Evgeniy',
        lastname: 'Panasenkov',
        email: 'panasenkov.tollit@gmail.com',
        password: 'panasenkov123',
        role: currentRole,
      };

      expect(currentUser).resolves.toEqual(currentUser);
      expect(currentRole).resolves.toEqual(currentRole);
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
      expect(await service.deleteCurrentUser(currentUser)).resolves.toEqual(4);

      expect(mockUsersRepository.findOne).toHaveBeenCalledWith('Rustacean');
      expect(mockUsersRepository.delete).toHaveBeenCalledWith(currentUser);

      expect(mockUsersRepository.delete).toHaveReturnedWith(1);

      expect(mockUsersRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockUsersRepository.delete).toHaveBeenCalledTimes(1);
    } catch (e) {
      console.log('U cannot delete a current user');
    }
  });

  it('should be notify all users, which subscribed on the current author', async () => {
    try {
      await service.getCurrentUserByParam('Rustacean');
    } catch (e) {}
  });

  it('should be subscribe on the current author', async () => {
    try {
      const currentAuthor = await service.getCurrentUserByParam('Rustacean');
      const currentUser = await service.getCurrentUserByParam('SlamDunk');

      const updatedUser: CreateUserDTO<string> = {
        ...currentUser,
        notifications: [
          {
            text: `Вы были добавлены в качестве коллаборатора в доску "MyDesk"`,
            event: 'Автор добавил вас в доску',
            author: currentAuthor.username,
            user: currentUser.username,
          },
        ],
      };

      const subscriber: subscriber<UserEntity> = {
        author: currentAuthor,
        subscribers: [currentUser],
      };

      expect(await service.getCurrentUserByParam('Rustacean')).resolves.toEqual(
        currentAuthor,
      );
      expect(await service.getCurrentUserByParam('SlamDunk')).resolves.toEqual(
        currentUser,
      );
      expect(
        await service.updateCurrentUser(currentUser, updatedUser),
      ).resolves.toEqual(updatedUser);
      expect(await service.subscribe(currentUser, 'SlamDunk')).resolves.toEqual(
        subscriber,
      );

      expect(mockUsersRepository.findOne).toHaveBeenCalledWith('Rustacean');
      expect(mockUsersRepository.findOne).toHaveBeenCalledWith('SlamDunk');
      expect(mockUsersRepository.update).toHaveBeenCalledWith(
        currentUser,
        updatedUser,
      );

      expect(mockUsersRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockUsersRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockUsersRepository.update).toHaveBeenCalledTimes(1);
    } catch (e) {}
  });

  it('should be unsubscirbe from the current author', async () => {
    try {
      const currentAuthor = await service.getCurrentUserByParam('Rustacean');
      const currentUser = await service.getCurrentUserByParam('SlamDunk');
    } catch (e) {}
  });
});
