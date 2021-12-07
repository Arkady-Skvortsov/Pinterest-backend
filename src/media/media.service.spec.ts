import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoryService } from '../history/history.service';
import { BoardsService } from '../boards/boards.service';
import { CommentsService } from '../comments/comments.service';
import { PinsService } from '../pins/pins.service';
import { MediaService } from './media.service';
import PinEntity from '../entities/pin.entity';
import { BoardEntity } from '../entities/board.entity';
import CommentEntity from '../entities/comment.entity';
import HistoryEntity from '../entities/history.entity';

describe('MediaService', () => {
  let service: MediaService;
  let pinsService: PinsService;
  let boardsService: BoardsService;
  let commentsService: CommentsService;
  let historyService: HistoryService;

  let pinsRepository: Repository<PinEntity>;
  let boardsRepository: Repository<BoardEntity>;
  let commentsRepository: Repository<CommentEntity>;
  let historyRepository: Repository<HistoryEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MediaService,
        PinsService,
        BoardsService,
        CommentsService,
        HistoryService,
        { provide: getRepositoryToken(PinEntity), useValue: {} },
        { provide: getRepositoryToken(BoardEntity), useValue: {} },
        { provide: getRepositoryToken(CommentEntity), useValue: {} },
        { provide: getRepositoryToken(HistoryEntity), useValue: {} },
      ],
    })
      .overrideProvider(MediaService)
      .useValue({})
      .compile();

    service = module.get<MediaService>(MediaService);
    boardsService = module.get<BoardsService>(BoardsService);
    pinsService = module.get<PinsService>(PinsService);
    commentsService = module.get<CommentsService>(CommentsService);
    historyService = module.get<HistoryService>(HistoryService);

    boardsRepository = module.get<Repository<BoardEntity>>(
      getRepositoryToken(BoardEntity),
    );
    pinsRepository = module.get<Repository<PinEntity>>(
      getRepositoryToken(PinEntity),
    );
    commentsRepository = module.get<Repository<CommentEntity>>(
      getRepositoryToken(CommentEntity),
    );
    historyRepository = module.get<Repository<HistoryEntity>>(
      getRepositoryToken(HistoryEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be get all media in the application', () => {});

  it('should be get a current media in the application', () => {});

  it('should be create a new media', () => {});

  it('should be update a current media by her id', () => {});

  it('should be delete a current media by her id', () => {});
});
