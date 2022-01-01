import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardEntity } from '../entities/board.entity';
import { createSearchDTO } from '../dto/search.dto';
import PinEntity from '../entities/pin.entity';
import UserEntity from '../entities/users.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(BoardEntity) private boardEntity: Repository<BoardEntity>,
    @InjectRepository(PinEntity) private pinEntity: Repository<PinEntity>,
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
  ) {}

  //Todo: add pagination per page right here

  async searchByText(text: string): Promise<createSearchDTO> {
    return this.searchResults(text, 'text');
  }

  async searchByTags(text: string): Promise<createSearchDTO> {
    return this.searchResults(text, 'tags');
  }

  private async searchResults(
    text: string,
    searchType: string,
  ): Promise<createSearchDTO> {
    let result;

    if (searchType === 'text') {
      result = await this.boardEntity
        .createQueryBuilder('boards')
        .where('boards.title LIKE :title', { title: `%${text}` })
        .getMany();

      result = await this.pinEntity
        .createQueryBuilder('pins')
        .where('pins.title LIKE :title', { title: `%${text}` })
        .getMany();

      result = await this.userEntity
        .createQueryBuilder('users')
        .where('users.username LIKE :username', { username: `%${text}` })
        .getMany();
    }

    if (searchType === 'tag') {
      result = await this.pinEntity.find({ where: { tags: [text] } });
    }

    return result;
  }
}
