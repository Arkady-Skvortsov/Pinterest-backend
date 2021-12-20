import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';
import UserEntity from '../src/entities/users.entity';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  const mockUsers = [
    {
      username: 'Arkadiy123',
      firstname: 'Arkasha',
      lastname: 'Skvortsov',
      jwtToken: 'someToken....',
      email: 'some.email@mail.ru',
      password: 'Somepass234',
      role: 'admins',
    },
  ];

  const mockUserRepository = {
    find: jest.fn().mockResolvedValue(mockUsers),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getRepositoryToken(UserEntity))
      .useValue(mockUserRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users/all (GET)', () => {
    return request(app.getHttpServer())
      .get('/users/all')
      .expect(200)
      .expect(mockUsers);
  });
});
