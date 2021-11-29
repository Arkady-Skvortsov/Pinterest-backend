import { Injectable } from '@nestjs/common';

@Injectable()
export class HistoryMementoService {}

class Creator {
  save() {}

  restore() {}
}

class CareTaker {
  getMemento() {}

  setMemento() {}
}
