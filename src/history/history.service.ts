import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import HistoryEntity from '../entities/history.entity';
import { historyMedia } from '../dto/history.dto';
import { JwtTokenService } from '../jwt-token/jwt-token.service';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistoryEntity)
    private historyEntity: Repository<HistoryEntity>,
    private jwtTokenService: JwtTokenService,
  ) {}

  async getAllHistory(token: string): Promise<HistoryEntity[]> {
    const { user } = await this.jwtTokenService.findToken(token);

    const histories = user.history;

    return histories;
  }

  async getCurrentHistory(token: string, id: number): Promise<HistoryEntity> {
    const { user } = await this.jwtTokenService.findToken(token);
    let currentHistory;

    user.history.filter((h) => {
      if (h.id === id) currentHistory = h;
    });

    return currentHistory;
  }

  async deleteCurrentHistory(token: string, id: number): Promise<number> {
    const { user } = await this.jwtTokenService.findToken(token);
    let currentHistory;

    user.history.filter((history) => {
      if (history.id === id) currentHistory = history;
    });

    await this.historyEntity.delete(currentHistory);

    return currentHistory.id;
  }
}

export class HistoryMementoService {
  constructor(private state: historyMedia[]) {}

  public getState() {
    return this.state;
  }
}

export class Originator {
  private state: historyMedia[];

  public setState(state: historyMedia[]) {
    console.log('Originator: Setting state to ', this.state);

    this.state = state;
  }

  public commit(): HistoryMementoService {
    console.log('Originator: Saving to Memento.');

    return new HistoryMementoService(this.state);
  }

  public roolback(m: HistoryMementoService) {
    this.state = m.getState();

    console.log('Originator: State after restoring from Memento: ', this.state);
  }
}

export class Caretaker {
  private mementos = [];

  public addMemento(m: HistoryMementoService) {
    this.mementos.push(m);
  }

  public getMemento(index): HistoryMementoService {
    return this.mementos[index];
  }
}
