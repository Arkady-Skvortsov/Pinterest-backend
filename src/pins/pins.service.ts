import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreatePinDTO from '../dto/pin.dto';
import { BoardsService } from '../boards/boards.service';
import PinEntity from '../entities/pin.entity';
import UserEntity from '../entities/users.entity';
import { HistoryService } from '../history/history.service';

@Injectable()
export class PinsService {
  constructor(
    @InjectRepository(PinEntity) private pinEntity: Repository<PinEntity>,
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
    private boardsService: BoardsService,
    private historyService: HistoryService,
  ) {}

  async getAllPins(): Promise<PinEntity[]> {
    const pins = await this.pinEntity.find();

    return pins;
  }

  async getCurrentPin(title: string): Promise<PinEntity> {
    const currentPin = await this.pinEntity.findOne({ where: { title } });

    return currentPin;
  }

  async createNewPin(user: UserEntity, dto: CreatePinDTO): Promise<PinEntity> {
    const newPin = await this.pinEntity.create({
      ...dto,
      photo: dto.photo.buffer.toString(),
      author: user,
    });

    await this.pinEntity.save(newPin);

    user.pins.push(newPin);

    await this.userEntity.update(user, { pins: [newPin] });

    return newPin;
  }

  async updateCurrentPin(
    user: UserEntity,
    title: string,
    dto: CreatePinDTO,
    photo?: Express.Multer.File,
  ): Promise<PinEntity> {
    const pin = await this.getCurrentPin(title);

    const currentPin = user.pins.find(
      (p) => p.title === pin.title && p.author === user,
    );

    await this.pinEntity.update(currentPin, {
      ...dto,
      photo: photo.buffer.toString(),
    });

    return currentPin;
  }

  async changeVisibility(
    user: UserEntity,
    title: string,
    visibility: boolean,
  ): Promise<PinEntity> {
    const Pin = await this.getCurrentPin(title);

    if (Pin.author === user) {
      await this.pinEntity.update(Pin, { visibility });

      await this.pinEntity.save(Pin);
    }

    return Pin;
  }

  //Todo: send it in BoardModule after tests..
  async addCurrentPin(
    user: UserEntity,
    title: string,
    choose?: string,
  ): Promise<PinEntity> {
    const Pin = await this.getCurrentPin(title);
    const currentBoard = await this.boardsService.getCurrentBoard(choose);

    if (Pin.author !== user && currentBoard) {
      currentBoard.pins.push(Pin);

      // await this.boardsService.updateCurrentBoard(user, currentBoard.title, {
      //   pins: [Pin],
      // });
    }

    return Pin;
  }

  async deleteCurrentPin(user: UserEntity, title: string): Promise<string> {
    const Pin = await this.getCurrentPin(title);
    let currentPin;

    user.pins
      .filter((pin) => {
        if (pin.title === Pin.title && pin.author === user) currentPin = pin;
      })
      .pop();

    await this.pinEntity.delete(currentPin);

    return currentPin.title;
  }
}
