import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../auth/auth.guard';
import CreateRoleDTO from '../dto/role.dto';
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
        const currentRole = mockRoles.find((role) => role.title === title);

        Object.assign(currentRole, { ...dto });

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
          useValue: jest.fn().mockImplementation((auth: boolean) => auth),
        },
        {
          provide: RolesGuard,
          useValue: jest.fn().mockImplementation((access: boolean) => access),
        },
      ],
    })
      .overrideProvider(RolesService)
      .useValue(mockRolesService)
      .compile();

    controller = module.get<RolesController>(RolesController);
    service = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('should be get all roles in app', () => {
    it('With permissions', async () => {
      expect(await controller.getAllRoles()).toEqual(mockRoles);
    });

    it('Without permission', () => {});
  });

  describe('should be get a current role by her title', () => {
    it('With permissions', async () => {
      expect(await controller.getCurrentRole('admin')).toEqual(mockRoles[0]);
    });

    it('Without permissions', () => {});
  });

  describe('should be create a new role', () => {
    it('With permissions', async () => {
      const newRole: CreateRoleDTO<string> = {
        id: 3,
        title: 'tester',
        description: 'U can test something...',
      };

      expect(await controller.createNewRole(newRole)).toEqual(newRole);
    });

    it('Without permissions', () => {});
  });

  describe('should be update a current role by her title', () => {
    xit('With permissions', async () => {
      const updatedRole: CreateRoleDTO<string> = {
        id: 1,
        title: 'teamlead',
        description: 'U can review a bad code of stupid devs 😺...',
      };

      await controller.updateCurrentRole('admin', updatedRole);
    });

    it('Without permissions', () => {});
  });

  describe('should be delete a current role by her title', () => {
    it('With permissions', async () => {
      const currentRole = await controller.getCurrentRole('user');

      expect(currentRole).toEqual(mockRoles[1]);
      expect(await controller.deleteCurrentRole('user')).toEqual(2);
    });

    it('Without permissions', () => {});
  });
});
