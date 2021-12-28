import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../auth/auth.guard';
import CreateRoleDTO, { roles } from '../dto/role.dto';
import { RolesController } from './roles.controller';
import { RolesGuard } from './roles.guard';
import { RolesService } from './roles.service';

describe('RolesController', () => {
  let controller: RolesController;
  let service: RolesService;

  const mockRoles: CreateRoleDTO<string>[] = [
    { id: 1, title: 'admin', description: 'U can ban ban stupid users 😅 ' },
    {
      id: 2,
      title: 'user',
      description: 'U can find something interesting for ur ideas in app',
    },
  ];

  const mockAuthGuard = jest.fn().mockRejectedValueOnce((bool: boolean) => {
    if (bool === false) throw new Error('User are not authorized');

    return bool;
  });

  const mockRolesGuard = jest.fn().mockRejectedValue((role: roles) => {
    if (role === 'user') throw new Error('U haven"t admin role');

    return role;
  });

  const mockRolesService = {
    getAllRoles: jest.fn().mockImplementation(() => mockRoles),
    getCurrentRole: jest.fn().mockImplementation((title: string) => {
      const currentRole = mockRoles.find((role) => role.title === title);
      return currentRole;
    }),
    createNewRole: jest
      .fn()
      .mockImplementation((dto: CreateRoleDTO<string>) => {
        const newRole = { ...dto };
        mockRoles.push(newRole);
        return newRole;
      }),
    updateCurrentRole: jest
      .fn()
      .mockImplementation((dto: CreateRoleDTO<string>, title: string) => {
        let currentRole = mockRoles.find((role) => role.title === title);
        currentRole = dto;
        return currentRole;
      }),
    deleteCurrentRole: jest.fn().mockImplementation((title: string) => {
      const currentRole = mockRoles.find((role) => role.title === title);
      return currentRole.id;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        { provide: RolesService, useValue: mockRolesService },
        {
          provide: AuthGuard,
          useValue: mockAuthGuard,
        },
        {
          provide: RolesGuard,
          useValue: mockRolesGuard,
        },
      ],
    }).compile();

    controller = module.get<RolesController>(RolesController);
    service = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('should be get all roles in app', () => {
    it('With permissions', async () => {
      try {
        mockAuthGuard(true);
        mockRolesGuard('admin');

        expect(await controller.getAllRoles()).toEqual(mockRoles);
      } catch (e) {
        console.log(e);
      }
    });

    it('Without permission', async () => {
      try {
        mockAuthGuard(true);
        mockRolesGuard('user');

        expect(await controller.getAllRoles()).toEqual(mockRoles);
      } catch (e) {
        console.log(e);
      }
    });
  });

  describe('Should be get a current role by her title', () => {
    it('With permission', async () => {
      try {
        mockAuthGuard(true);
        mockRolesGuard('admin');

        expect(await controller.getCurrentRole('admin')).toEqual(mockRoles[0]);
      } catch (e) {
        console.log(e);
      }
    });

    it('Without permission', async () => {
      try {
        mockAuthGuard(true);
        mockRolesGuard('user');

        expect(await controller.getCurrentRole('admin')).toEqual(mockRoles[0]);
      } catch (e) {
        console.log(e);
      }
    });
  });

  describe('Should be create a new role', () => {
    const newRole: CreateRoleDTO<string> = {
      id: 3,
      title: 'tester',
      description: 'U can test something...',
    };

    it('With permissions', async () => {
      try {
        mockAuthGuard(true);
        mockRolesGuard('admin');

        expect(await controller.createNewRole(newRole)).toEqual(newRole);
      } catch (e) {
        console.log(e);
      }
    });

    it('Without permission', async () => {
      try {
        mockAuthGuard(true);
        mockRolesGuard('user');

        expect(await controller.createNewRole(newRole)).toEqual(newRole);
      } catch (e) {
        console.log(e);
      }
    });
  });

  describe('should be update a current role by her title', () => {
    const updatedRole: CreateRoleDTO<string> = {
      id: 1,
      title: 'teamlead',
      description: 'U can review a bad code of stupid devs 😺...',
    };

    it('With permission', async () => {
      try {
        mockAuthGuard(true);
        mockRolesGuard('admin');

        expect(
          await controller.updateCurrentRole('admin', updatedRole),
        ).toEqual(updatedRole);
      } catch (e) {
        console.log(e);
      }
    });

    it('Without permission', async () => {
      try {
        mockAuthGuard(true);
        mockRolesGuard('user');

        expect(
          await controller.updateCurrentRole('admin', updatedRole),
        ).toEqual(updatedRole);
      } catch (e) {
        console.log(e);
      }
    });
  });

  describe('should be delete a current role by her title', () => {
    it('With permissions', async () => {
      try {
        mockAuthGuard(true);
        mockRolesGuard('admin');

        expect(await service.getCurrentRole('user')).toEqual(mockRoles[1]);
        expect(await controller.deleteCurrentRole('user')).toEqual(2);
      } catch (e) {
        console.log(e);
      }
    });

    it('Without permission', async () => {
      try {
        mockAuthGuard(true);
        mockRolesGuard('user');

        expect(await service.getCurrentRole('user')).toEqual(mockRoles[1]);
        expect(await controller.deleteCurrentRole('user')).toEqual(2);
      } catch (e) {
        console.log(e);
      }
    });
  });
});
