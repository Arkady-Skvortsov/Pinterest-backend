import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesService } from './roles.service';
import RoleEntity from '../entities/roles.entity';

describe('RolesService', () => {
  let service: RolesService;

  let rolesRepository: Repository<RoleEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        { provide: getRepositoryToken(RoleEntity), useValue: {} },
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
    rolesRepository = module.get<Repository<RoleEntity>>(
      getRepositoryToken(RoleEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be get all roles in application', async () => {});

  it('should be get a current role by her title', async () => {});

  it('should be create a new role', async () => {});

  it('should be update a current role by her title', async () => {});

  it('should be delete a current role by her title', async () => {});
});
