import { Injectable } from '@nestjs/common';
import { historyMedia } from '../dto/history.dto';

@Injectable()
export class HistoryMementoService {
  private state: historyMedia[];

  public constructor(state: historyMedia[]) {
    this.state = state;
  }

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
