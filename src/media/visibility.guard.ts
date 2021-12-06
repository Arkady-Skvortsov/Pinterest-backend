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
import { MediaServiceFactory } from './media.service';

@Injectable()
export class VisibilityGuard implements CanActivate {
  constructor(
    private boardsService: BoardsService,
    private pinsService: PinsService,
    private mediaServiceFactory: MediaServiceFactory,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const ref: gMedia = this.reflector.get<gMedia>(
        'TypeMedia',
        context.getHandler(),
      );

      const currentBoard = this.boardsService
        .getCurrentBoard('')
        .then((data) => data);

      return true;
    } catch (e) {
      throw new HttpException(
        'Не удалось получить доступ к спрятанному контенту',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
