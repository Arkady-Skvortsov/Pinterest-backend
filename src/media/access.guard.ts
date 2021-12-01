import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { gMedia } from '../dto/media.dto';
import { PinsService } from '../pins/pins.service';
import { BoardsService } from '../boards/boards.service';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private pinsService: PinsService,
    private boardsService: BoardsService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const mediaType: gMedia = this.reflector.get<gMedia>(
      'AppMedia',
      context.getHandler(),
    );

    const user = request.user;
    const bodyTitle = request.body.title;

    let currentMedia;

    if (mediaType === 'board') {
      this.boardsService
        .getCurrentBoard(bodyTitle)
        .then((board) => {
          if (board.private !== false) {
            currentMedia = board;
          }
        })
        .catch((e) => console.log(e));
    }

    if (mediaType === 'pin') {
      this.pinsService
        .getCurrentPin(bodyTitle)
        .then((pin) => {
          if (pin.private !== false) {
            currentMedia = pin;
          }
        })
        .catch((e) => console.log(e));
    }

    return currentMedia && true;
  }
}
