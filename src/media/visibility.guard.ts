import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { BoardsService } from '../boards/boards.service';
import { PinsService } from '../pins/pins.service';

@Injectable()
export class VisibilityGuard implements CanActivate {
  constructor(
    private boardsService: BoardsService,
    private pinsService: PinsService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      return true;
    } catch (e) {
      throw new HttpException(
        'Не удалось получить доступ к спрятанному контенту',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
