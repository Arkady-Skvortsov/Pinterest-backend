import { HttpException, HttpStatus } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import CreatePinDTO from '../dto/pin.dto';
import PinEntity from '../entities/pin.entity';
import { PinsService } from './pins.service';

@Resolver(() => PinEntity)
export class PinsResolver {
  constructor(private pinService: PinsService) {}

  @Query(() => [PinEntity], { name: 'getAllPins' })
  async getAllPins() {
    try {
    } catch (e) {
      throw new HttpException('Не удалось найти пины', HttpStatus.BAD_REQUEST);
    }
  }

  @Query(() => PinEntity, { name: 'getCurrentPin' })
  async getCurrentPin(@Args('id') id: number) {
    try {
    } catch (e) {
      throw new HttpException(
        'Не удалось найти конкретный пин',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Mutation(() => PinEntity, { name: 'createNewPin' })
  async createNewPin(@Args('dto') dto: CreatePinDTO) {
    try {
    } catch (e) {
      throw new HttpException(
        'Не удалось создать новый пин',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Mutation(() => PinEntity, { name: 'updateCurrentPin' })
  async updateCurrentPin(
    @Args('id') id: number,
    @Args('dto') dto: CreatePinDTO,
  ) {
    try {
    } catch (e) {
      throw new HttpException(
        'Не удалось обновить данный пин',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Mutation(() => PinEntity, { name: 'deleteCurrentPin' })
  async deleteCurrentPin() {
    try {
    } catch (e) {
      throw new HttpException(
        'Не удалось удалить данный пин',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
