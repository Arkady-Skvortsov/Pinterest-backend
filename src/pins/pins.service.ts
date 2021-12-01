import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreatePinDTO from '../dto/pin.dto';
import PinEntity from '../entities/pin.entity';
import UserEntity from '../entities/users.entity';
import { JwtTokenService } from '../jwt-token/jwt-token.service';

@Injectable()
export class PinsService {
  constructor(
    @InjectRepository(PinEntity) private pinEntity: Repository<PinEntity>,
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
    private jwtTokenService: JwtTokenService,
  ) {}

  async getAllPins(): Promise<PinEntity[]> {
    const pins = await this.pinEntity.find();

    return pins;
  }

  async getCurrentPin(title: string): Promise<PinEntity> {
    const currentPin = await this.pinEntity.findOne({ where: { title } });

    return currentPin;
  }

  async createNewPin(token: string, dto: CreatePinDTO): Promise<PinEntity> {
    const { user } = await this.jwtTokenService.findToken(token);

    const newPin = await this.pinEntity.create({
      ...dto,
      photo: dto.photo.buffer.toString(),
      author: user,
    });

    user.pins.push(newPin);

    await this.userEntity.update(user, { pins: [newPin] });

    return newPin;
  }

  async updateCurrentPin(
    token: string,
    title: string,
    dto: CreatePinDTO,
  ): Promise<PinEntity> {
    const { user } = await this.jwtTokenService.findToken(token);
    const pin = await this.getCurrentPin(title);
    let currentPin;

    user.pins
      .filter((p) => {
        if (p.title === pin.title && p.author === user) currentPin = p;
      })
      .pop();

    await this.pinEntity.update(currentPin, {
      ...dto,
      author: user,
      photo: dto.photo.buffer.toString(),
    });

    return currentPin;
  }

  async deleteCurrentPin(token: string, title: string): Promise<string> {
    const { user } = await this.jwtTokenService.findToken(token);
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
