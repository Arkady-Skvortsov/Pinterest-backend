import {
  HttpException,
  HttpStatus,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthGuard } from '../auth/auth.guard';
import { AccessGuard } from '../media/access.guard';
import { VisibilityGuard } from '../media/visibility.guard';
import CreatePinDTO from '../dto/pin.dto';
import PinEntity from '../entities/pin.entity';
import { PinsService } from './pins.service';
import { RequestCustom } from '../interfaces/auth.interface';
import { UsersGuard } from '../users/users.guard';
import IPins from '../interfaces/pins.interface';
import { CacheInterceptor } from '../redis/cache.interceptor';
import { CacheType } from '../decorators/cache.decorator';
import { MediaGuard } from '../media/media.guard';
import { MediaType } from '../decorators/media.decorator';

@UseInterceptors(CacheInterceptor)
@CacheType('pin')
@UseGuards(AuthGuard, VisibilityGuard, AccessGuard)
@Resolver(() => PinEntity)
export class PinsResolver implements IPins {
  constructor(private pinService: PinsService) {}

  @Query(() => [PinEntity], { name: 'getAllPins' })
  async getAllPins() {
    try {
      return this.pinService.getAllPins();
    } catch (e) {
      throw new HttpException('Не удалось найти пины', HttpStatus.BAD_REQUEST);
    }
  }

  @Query(() => PinEntity, { name: 'getCurrentPin' })
  @CacheType('pin')
  async getCurrentPin(@Args('title') title: string) {
    try {
      return this.pinService.getCurrentPin(title);
    } catch (e) {
      throw new HttpException(
        'Не удалось найти конкретный пин',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(UsersGuard)
  @Mutation(() => PinEntity, { name: 'createNewPin' })
  async createNewPin(
    @Request() request: RequestCustom,
    @Args('CreatePinDTO') dto: CreatePinDTO,
  ) {
    try {
      return this.pinService.createNewPin(request.user, dto);
    } catch (e) {
      throw new HttpException(
        'Не удалось создать новый пин',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @UseGuards(MediaGuard)
  @MediaType('pin')
  @Mutation(() => PinEntity, { name: 'updateCurrentPin' })
  async updateCurrentPin(
    @Request() request: RequestCustom,
    @Args('title') title: string,
    @Args('CreatePinDTO') dto: CreatePinDTO,
  ) {
    try {
      return this.pinService.updateCurrentPin(request.user, title, dto);
    } catch (e) {
      throw new HttpException(
        'Не удалось обновить данный пин',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Mutation(() => PinEntity, { name: 'addCurrentPin' })
  async addCurrentPin(
    @Request() request: RequestCustom,
    @Args({ name: 'title' }) title: string,
    @Args({ name: 'choose' }) choose?: string,
  ) {
    try {
      return this.pinService.addCurrentPin(request.user, title, choose);
    } catch (e) {
      throw new HttpException(
        `Не удалось добавить ${title} пин`,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @UseGuards(MediaGuard)
  @MediaType('pin')
  @Mutation(() => PinEntity, { name: 'changeVisibility' })
  async changeVisibility(
    @Request() request: RequestCustom,
    @Args({ name: 'title' }) title: string,
    @Args({ name: 'visibility' }) visibility: boolean,
  ) {
    try {
      return this.pinService.changeVisibility(request.user, title, visibility);
    } catch (e) {
      throw new HttpException(
        'Не удалось поменять видимость пина',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @UseGuards(MediaGuard)
  @MediaType('pin')
  @Mutation(() => PinEntity, { name: 'deleteCurrentPin' })
  async deleteCurrentPin(
    @Request() request: RequestCustom,
    @Args({ name: 'title' }) title: string,
  ) {
    try {
      return this.pinService.deleteCurrentPin(request.user, title);
    } catch (e) {
      throw new HttpException(
        'Не удалось удалить данный пин',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
