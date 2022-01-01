import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../auth/auth.guard';
import CreateUserDTO from '../dto/users.dto';
import { AccessGuard } from '../media/access.guard';
import { MediaGuard } from '../media/media.guard';
import { VisibilityGuard } from '../media/visibility.guard';
import { UsersGuard } from '../users/users.guard';
import { mockPins, mockUsers } from '../../test/data/mock-data';
import { PinsResolver } from './pins.resolver';
import { PinsService } from './pins.service';
import { gMedia } from 'src/dto/media.dto';
import CreatePinDTO from 'src/dto/pin.dto';

describe('PinsResolver', () => {
  let resolver: PinsResolver;

  const mockAuthGuard = jest.fn().mockImplementation((value: boolean) => {
    if (value === false) console.log('false');

    return value;
  });

  const mockMediaGuard = jest.fn().mockImplementation((gMedia: gMedia) => {
    if (gMedia !== 'pin') console.log('false');

    return true;
  });

  const mockUsersGuard = jest.fn().mockImplementation((user: CreateUserDTO) => {
    if (user.isBan === true) console.log('false');

    return true;
  });

  const mockVisibilityGuard = jest.fn().mockRejectedValue((bool: true) => bool);

  const mockAccessGuard = jest.fn().mockImplementation((pin: CreatePinDTO) => {
    if (pin.private) console.log('private');

    return true;
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PinsResolver,
        PinsService,
        {
          provide: AuthGuard,
          useValue: mockAuthGuard,
        },
        {
          provide: MediaGuard,
          useValue: mockMediaGuard,
        },
        {
          provide: UsersGuard,
          useValue: mockUsersGuard,
        },
        {
          provide: AccessGuard,
          useValue: mockAccessGuard,
        },
        {
          provide: VisibilityGuard,
          useValue: mockVisibilityGuard,
        },
      ],
    }).compile();

    resolver = module.get<PinsResolver>(PinsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('Get all pins in application', () => {
    it('With Permission', async () => {
      try {
        mockAuthGuard(true);

        expect(await resolver.getAllPins()).resolves.toEqual({ ...mockPins });
      } catch (e) {
        console.log(e);
      }
    });

    it('Without permisson', async () => {
      try {
        mockAuthGuard(false);

        expect(await resolver.getAllPins()).resolves.toEqual({ ...mockPins });
      } catch (e) {
        console.log(e);
      }
    });
  });

  it('Get current pin by title', async () => {
    try {
      expect(await resolver.getCurrentPin(mockPins[0].title)).resolves.toEqual(
        mockPins[0],
      );
    } catch (e) {
      console.log(e);
    }
  });

  it('Create a new pin by user', async () => {
    try {
    } catch (e) {
      console.log(e);
    }
  });

  it('Update a current pin by title', async () => {
    try {
    } catch (e) {
      console.log(e);
    }
  });

  it('Delete a current pin', async () => {
    try {
    } catch (e) {
      console.log(e);
    }
  });
});
