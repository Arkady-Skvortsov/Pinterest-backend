import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { gMedia } from '../dto/media.dto';
import { BoardsService } from '../boards/boards.service';
import { PinsService } from '../pins/pins.service';

@Injectable()
export class VisibilityGuard implements CanActivate {
  private boardsService: BoardsService;
  private pinsService: PinsService;

  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest().body;

      const ref: gMedia = this.reflector.get<gMedia>(
        'TypeMedia',
        context.getHandler(),
      );

      const title: string = request.params.title;

      //Todo: Refactoring that's all with MediaServiceFactory later...

      let currentVisibility;

      if (ref === 'board') {
        this.boardsService
          .getCurrentBoard(title)
          .then((data) => (currentVisibility = data.visibility))
          .catch((e) => e);
      }

      if (ref === 'pin') {
        this.pinsService
          .getCurrentPin(title)
          .then((data) => (currentVisibility = data.visibility))
          .catch((e) => e);
      }

      if (currentVisibility) {
        throw new HttpException(
          'Данное медиа не доступно к просмотру',
          HttpStatus.FORBIDDEN,
        );
      }

      request.currentMedia = currentVisibility;

      return true;
    } catch (e) {
      throw new HttpException(
        'Не удалось получить доступ к спрятанному контенту',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
