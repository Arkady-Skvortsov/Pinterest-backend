import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { gMedia } from '../dto/media.dto';
import { PinsService } from '../pins/pins.service';
import { BoardsService } from '../boards/boards.service';

@Injectable()
export class AccessGuard implements CanActivate {
  // private boardsService: BoardsService,
  // private pinsService: PinsService,

  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const mediaType: gMedia = this.reflector.get<gMedia>(
      'typeMedia',
      context.getHandler(),
    );

    const currentVisibility = request.currentMedia;

    let currentMedia;

    // if (mediaType === 'board') {
    //   //Todo: Refactoring that's operation
    //   this.boardsService
    //     .getCurrentBoard(bodyTitle)
    //     .then((board) => {
    //       if (board.private !== false) {
    //         currentMedia = board;
    //       }
    //     })
    //     .catch((e) => console.log(e));
    // }

    // if (mediaType === 'pin') {
    //   this.pinsService
    //     .getCurrentPin(bodyTitle)
    //     .then((pin) => {
    //       if (pin.private !== false) {
    //         currentMedia = pin;
    //       }
    //     })
    //     .catch((e) => console.log(e));
    // }

    request.currentMedia = currentMedia;

    return true;
  }
}
