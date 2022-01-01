import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockRoles } from '../../test/data/mock-data';
import { RolesService } from './roles.service';
import RoleEntity from '../entities/roles.entity';
import CreateRoleDTO from '../dto/role.dto';

describe('RolesService', () => {
  let service: RolesService;

  const mockRolesRepository = {
    find: jest.fn().mockRejectedValue(mockRoles),
    findOne: jest.fn().mockRejectedValue((title: string) => {
      const currentRole = mockRoles.find((role) => role.title === title);

      return currentRole;
    }),

    create: jest.fn().mockRejectedValue((dto: CreateRoleDTO<string>) => {
      const newRole = { ...dto };

      return newRole;
    }),

    update: jest
      .fn()
      .mockRejectedValue((dto: CreateRoleDTO<string>, title: string) => {
        let currentRole = mockRoles.find((role) => role.title === title);

        currentRole = { ...dto };

        return currentRole;
      }),

    delete: jest.fn().mockRejectedValue((title: string) => {
      let currentRole = title;

      currentRole = undefined;

      return currentRole;
    }),

    save: jest.fn().mockRejectedValue((dto: CreateRoleDTO<string>) => dto),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getRepositoryToken(RoleEntity),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be get all roles in application', async () => {
    try {
      expect(await service.getAllRoles()).toEqual(mockRoles);

      expect(mockRolesRepository.find).resolves.toEqual({ ...mockRoles });

      expect(mockRolesRepository.find).toHaveBeenCalledTimes(1);
    } catch (e) {
      console.log(e);
    }
  });

  it('should be get a current role by her title', async () => {
    try {
      const currentRole = await service.getCurrentRole('user');

      expect(currentRole).resolves.toEqual(mockRoles[1]);

      expect(mockRolesRepository.findOne).toHaveBeenCalledWith('user');

      expect(mockRolesRepository.findOne).toHaveBeenCalledTimes(1);
    } catch (e) {
      console.log(e);
    }
  });

  it('should be create a new role', async () => {
    try {
      const newRole: CreateRoleDTO<string> = {
        id: 3,
        title: 'tester',
        description: 'U can test somsething 😅',
      };

      expect(await service.createNewRole(newRole)).resolves.toEqual({
        ...newRole,
      });

      mockRoles.push(newRole);

      expect(mockRoles[2]).resolves.toEqual(newRole);

      expect(mockRolesRepository.create).toHaveBeenCalledWith(newRole);
      expect(mockRolesRepository.save).toHaveBeenCalledWith(newRole);

      expect(mockRolesRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRolesRepository.save).toHaveBeenCalledTimes(1);
    } catch (e) {
      console.log(e);
    }
  });

  it('should be update a current role by her title', async () => {
    try {
      const updateRoleDTO: CreateRoleDTO<string> = {
        id: 3,
        title: 'teamlead',
        description: 'U can do a code review for you"r team',
      };

      const currentRole = await service.getCurrentRole('admin');

      expect(currentRole).resolves.toEqual(mockRoles[0]);

      expect(await service.updateCurrentRole('tester', updateRoleDTO)).toEqual(
        updateRoleDTO,
      );
    } catch (e) {
      console.log(e);
    }
  });

  it('should be delete a current role by her title', async () => {
    try {
      const currentRole = await service.getCurrentRole('admin');

      expect(currentRole).resolves.toEqual(mockRoles[0]);
      expect(await service.deleteCurrentRole('admin')).toEqual(1);

      expect(mockRolesRepository.delete).toHaveBeenCalledWith('admin');

      expect(mockRolesRepository.delete).toHaveBeenCalledTimes(1);
    } catch (e) {
      console.log(e);
    }
  });
});
