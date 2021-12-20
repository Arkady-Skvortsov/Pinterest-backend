import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
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
import CreateRoleDTO from 'src/dto/role.dto';

describe('UsersService', () => {
  let service: UsersService;
  let rolesService: RolesService;
  let notificationObserverService: NotificationObserverService;
  let jwtTokenService: JwtTokenService;

  let usersRepository: Repository<UsersEntity>;
  let rolesRepository: Repository<RoleEntity>;
  let notificationRepository: Repository<NotificationEntity>;
  let jwtTokenRepository: Repository<JwtTokenEntity>;

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
    create: jest.fn().mockImplementation((dto: CreateUserDTO<string>) => {
      let newUser;

      mockUsers.push(newUser);

      return newUser;
    }),
    update: jest.fn().mockRejectedValue(() => {}),
    save: jest.fn().mockRejectedValue(() => {}),
  };

  const mockRolesRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        RolesService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUsersRepository,
        },
        {
          provide: getRepositoryToken(RoleEntity),
          useValue: mockRolesRepository,
        },
      ],
    })
      .overrideProvider(UsersService)
      .useValue({})
      .compile();

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

  it('should ', () => {});

  it('', () => {});

  it('', () => {});

  it('', () => {});

  it('', () => {});
});
