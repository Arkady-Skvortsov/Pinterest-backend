import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HistoryService } from '../history/history.service';
import { BoardsService } from '../boards/boards.service';
import { CommentsService } from '../comments/comments.service';
import { PinsService } from '../pins/pins.service';
import { MediaService } from './media.service';
import PinEntity from '../entities/pin.entity';
import { BoardEntity } from '../entities/board.entity';
import CommentEntity from '../entities/comment.entity';
import HistoryEntity from '../entities/history.entity';
import UserEntity from '../entities/users.entity';

describe('MediaService', () => {
  let service: MediaService;

  const mockPinsService = {};

  const mockBoardService = {};

  const mockCommentsService = {};

  const mockHistoryService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MediaService,
        { provide: PinsService, useValue: mockPinsService },
        { provide: BoardsService, useValue: mockBoardService },
        { provide: CommentsService, useValue: mockCommentsService },
        { provide: HistoryService, useValue: mockHistoryService },
        { provide: getRepositoryToken(UserEntity), useValue: {} },
        { provide: getRepositoryToken(PinEntity), useValue: {} },
        { provide: getRepositoryToken(BoardEntity), useValue: {} },
        { provide: getRepositoryToken(CommentEntity), useValue: {} },
        { provide: getRepositoryToken(HistoryEntity), useValue: {} },
      ],
    }).compile();

    service = module.get<MediaService>(MediaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be get all media in the application', async () => {
    try {
    } catch (e) {
      console.log(e);
    }
  });

  it('should be get a current media in the application', async () => {
    try {
    } catch (e) {
      console.log(e);
    }
  });

  it('should be create a new media', async () => {
    try {
    } catch (e) {
      console.log(e);
    }
  });

  it('should be update a current media by her id', async () => {
    try {
    } catch (e) {
      console.log(e);
    }
  });

  it('should be delete a current media by her id', async () => {
    try {
    } catch (e) {
      console.log(e);
    }
  });
});
