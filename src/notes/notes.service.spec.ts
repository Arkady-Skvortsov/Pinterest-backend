import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardsService } from '../boards/boards.service';
import { BoardEntity } from '../entities/board.entity';
import NotesEntity from '../entities/notes.entity';
import UserEntity from '../entities/users.entity';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import { UsersService } from '../users/users.service';
import { NotesService } from './notes.service';

describe('NotesService', () => {
  let service: NotesService;
  let userService: UsersService;
  let jwtTokenService: JwtTokenService;
  let boardsService: BoardsService;

  let notesRepository: Repository<NotesEntity>;
  let usersRepository: Repository<UserEntity>;
  let boardRepository: Repository<BoardEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        UsersService,
        JwtTokenService,
        BoardsService,
        { provide: getRepositoryToken(NotesEntity), useValue: {} },
        { provide: getRepositoryToken(UserEntity), useValue: {} },
        { provide: getRepositoryToken(BoardEntity), useValue: {} },
      ],
    })
      .overrideProvider(NotesService)
      .useValue({})
      .compile();

    service = module.get<NotesService>(NotesService);
    userService = module.get<UsersService>(UsersService);
    jwtTokenService = module.get<JwtTokenService>(JwtTokenService);
    boardsService = module.get<BoardsService>(BoardsService);

    notesRepository = module.get<Repository<NotesEntity>>(
      getRepositoryToken(NotesEntity),
    );
    usersRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    boardRepository = module.get<Repository<BoardEntity>>(
      getRepositoryToken(BoardEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be get all notes from current board by her title', async () => {});

  it('should be get current note by id from board by her title', async () => {});

  it('should be create new notes under current board', async () => {});

  it('should be update current note by id under current board', async () => {});

  it('should be delete current note by id under current ntoe', async () => {});
});
