import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import HistoryEntity from '../entities/history.entity';
import CreateHistoryDTO, { historyMedia } from '../dto/history.dto';
import UserEntity from '../entities/users.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistoryEntity)
    private historyEntity: Repository<HistoryEntity>,
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
    const newHistory = this.historyEntity.create(dto);

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
