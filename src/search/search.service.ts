import { BoardsService } from '@boards/boards.service';
import { Injectable } from '@nestjs/common';
import { PinsService } from '@pins/pins.service';
import { UsersService } from '@users/users.service';
import { createSearchDTO } from 'src/dto/search.dto';

@Injectable()
export class SearchService {
  constructor(
    private usersService: UsersService,
    private boardsService: BoardsService,
    private pinsService: PinsService,
  ) {}

  async search(text: string): Promise<createSearchDTO> {
    return this.searchResults(text);
  }

  private async searchResults(text: string): Promise<createSearchDTO> {
    const users = await this.usersService.getAllUsers();
    const boards = await this.boardsService.getAllBoards();
    const pins = await this.pinsService.getAllPins();

    let result;

    users.filter((entity) => {
      if (entity.username.includes(text)) result = entity;
    });

    boards.filter((board) => {
      if (board.title.includes(text)) result = board;
    });

    pins.filter((pin) => {
      if (pin.title.includes(text)) result = pin;
    });

    return result;
  }
}
