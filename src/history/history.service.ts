import { Injectable } from '@nestjs/common';

@Injectable()
export class HistoryMementoService {
  private state: Object;

  public constructor(state: Object) {
    this.state = state;
  }

  public getState(): Object {
    return this.state;
  }
}

export class Originator {
  private state: Object;

  public setState(state: Object) {
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
