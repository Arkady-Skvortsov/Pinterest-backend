import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import HistoryEntity from '../entities/history.entity';
import CreateHistoryDTO, { historyMedia } from '../dto/history.dto';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import UserEntity from 'src/entities/users.entity';
import { mediaEntity } from 'src/dto/media.dto';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistoryEntity)
    private historyEntity: Repository<HistoryEntity>,
    private jwtTokenService: JwtTokenService,
  ) {}

  async getAllHistory(user: UserEntity): Promise<HistoryEntity[]> {
    const histories = user.history;

    return histories;
  }

  async getCurrentHistory(
    user: UserEntity,
    id: number,
  ): Promise<HistoryEntity> {
    const currentHistory = user.history.find((h) => h.id === id);

    return currentHistory;
  }

  async createNewHistory(
    user: UserEntity,
    dto: CreateHistoryDTO,
  ): Promise<HistoryEntity> {
    const newHistory = await this.historyEntity.create({ ...dto });

    await this.historyEntity.save(newHistory);

    return newHistory;
  }

  async deleteCurrentHistory(user: UserEntity, id: number): Promise<number> {
    let currentHistory;

    user.history.filter((history) => {
      if (history.id === id) currentHistory = history;
    });

    await this.historyEntity.delete(currentHistory);

    return currentHistory.id;
  }
}
