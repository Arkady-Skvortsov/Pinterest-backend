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

describe('UsersService', () => {
  let service: UsersService;
  let rolesService: RolesService;
  let notificationObserverService: NotificationObserverService;
  let jwtTokenService: JwtTokenService;

  let usersRepository: Repository<UsersEntity>;
  let rolesRepository: Repository<RoleEntity>;
  let notificationRepository: Repository<NotificationEntity>;
  let jwtTokenRepository: Repository<JwtTokenEntity>;

  let mockUsers: CreateUserDTO<string>[];
  let mockNotifications: CreateNotificationDTO<string>[];

  let mockUsersRepository = {};
  let mockRolesRepository = {};
  let mockNotificationRepository = {};
  let mockjwtTokenRepository = {};

  beforeAll(async () => {
    jest.setTimeout(10000);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        RolesService,
        NotificationObserverService,
        JwtTokenService,
        JwtService,
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
          useValue: mockjwtTokenRepository,
        },
        {
          provide: getRepositoryToken(NotificationEntity),
          useValue: mockNotificationRepository,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    })
      .overrideProvider(UsersService)
      .useValue({})
      .compile();

    mockUsers = [
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

    mockNotifications = [
      {
        text: '',
        event: 'Вы были забанены, азазаза :)',
        author: mockUsers[1].username,
        user: mockUsers[0].username,
      },
    ];

    mockUsersRepository = {};
    mockRolesRepository = {};
    mockjwtTokenRepository = {};
    mockNotificationRepository = {};

    service = module.get<UsersService>(UsersService);
    rolesService = module.get<RolesService>(RolesService);
    notificationObserverService = module.get<NotificationObserverService>(
      NotificationObserverService,
    );
    jwtTokenService = module.get<JwtTokenService>(JwtTokenService);

    usersRepository = module.get<Repository<UsersEntity>>(
      getRepositoryToken(UsersEntity),
    );
    rolesRepository = module.get<Repository<RoleEntity>>(
      getRepositoryToken(RoleEntity),
    );
    notificationRepository = module.get<Repository<NotificationEntity>>(
      getRepositoryToken(NotificationEntity),
    );
    jwtTokenRepository = module.get<Repository<JwtTokenEntity>>(
      getRepositoryToken(JwtTokenEntity),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', async () => {
    const users = await service.getAllUsers();
    const repoSpy = jest.spyOn(usersRepository, 'find');

    expect(users).toEqual({ ...mockUsers });
    expect(repoSpy).toEqual({ ...mockUsers });

    expect(users).toBeCalledTimes(1);
    expect(repoSpy).toBeCalledTimes(1);
  });

  it('should return a current user by jwtToken', async () => {
    const currentUser = await service.getCurrentUserByParam('SlamDunk');
    const jwt = await jwtTokenService.findToken('');
    const repoSpy = await jest.spyOn(usersRepository, 'findOne');

    expect(currentUser).toEqual({ ...mockUsers[0] });
    expect(currentUser).toBeCalledWith('Arkadiy');
    expect(currentUser).toBeCalledTimes(1);
  });

  it('should create a new user', async () => {
    const dto: CreateUserDTO<string> = {
      username: 'PostgresUser',
      firstname: 'Kaver',
      lastname: 'Loluhov',
      password: 'Dangers91',
      email: 'danger.postgres-user@gmail.com',
      photo: 'Postgres.png',
      role: 'admin',
    };

    const jwtDTO = {
      user: dto,
      token: '',
    };

    const newUser = await service.createUser(dto);
    const generateJwt = await jwtTokenService.generateToken(dto);
    const tokenSpy = await jest.spyOn(jwtTokenRepository, 'create');
    const userSpy = await jest.spyOn(usersRepository, 'create');

    expect(newUser).toBeCalledWith(dto);
    expect(newUser).toEqual({ ...dto });

    expect(mockUsers.length).toBeGreaterThanOrEqual(5);
    expect(mockUsers[5]).toEqual(dto);

    expect(generateJwt).toBeCalledWith(dto);
    expect(generateJwt);
    expect(generateJwt).toBeCalledTimes(1);

    expect(userSpy).toBeCalledWith(dto);
    expect(userSpy).toEqual({ ...dto });
    expect(userSpy).toBeCalledTimes(1);

    expect(tokenSpy).toBeCalledWith(dto);
    expect(tokenSpy).toEqual({});

    expect(newUser).toBeCalledTimes(1);
    expect(generateJwt).toBeCalledTimes(1);
    expect(userSpy).toBeCalledTimes(1);
    expect(tokenSpy).toBeCalledTimes(1);
  });

  xit('should update a current user by his jwt token', async () => {
    const updateUserDTO = {};
    const jwtToken = 'someToken';

    const { user } = await jwtTokenService.findToken(jwtToken);
    const findUserSpy = await jest.spyOn(usersRepository, 'findOne');
    const roleSpy = await jest.spyOn(rolesRepository, 'findOne');
    const updateUserSpy = await jest.spyOn(usersRepository, 'update');
    const findTokenSpy = await jest.spyOn(jwtTokenRepository, 'findOne');

    expect(findTokenSpy).resolves.toEqual(jwtToken);
    expect(findTokenSpy).toBeCalledTimes(1);
  });

  it('should delete a current user by his jwt token', async () => {});

  it('should ban a current user by his username', async () => {});
});
