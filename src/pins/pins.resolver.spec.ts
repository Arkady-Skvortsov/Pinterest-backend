import { Test, TestingModule } from '@nestjs/testing';
import { PinsResolver } from './pins.resolver';
import { PinsService } from './pins.service';

describe('PinsResolver', () => {
  let resolver: PinsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PinsResolver, { provide: PinsService, useValue: {} }],
    }).compile();

    resolver = module.get<PinsResolver>(PinsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('Get all pins by current user', async () => {
    try {
    } catch (e) {
      console.log(e);
    }
  });

  it('Get current pin by title', async () => {
    try {
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
