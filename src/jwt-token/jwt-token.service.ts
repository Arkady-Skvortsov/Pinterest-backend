import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import JwtTokenEntity from '../entities/jwt-token.entity';
import CreateUserDTO from '../dto/users.dto';
import { CreatePaylodDTO } from '../dto/token.dto';

@Injectable()
export class JwtTokenService {
  constructor(
    @InjectRepository(JwtTokenEntity)
    private jwtTokenEntity: Repository<JwtTokenEntity>,
    private jwtService: JwtService,
  ) {}

  async generateToken(dto: CreateUserDTO<string>): Promise<string> {
    const payload: CreatePaylodDTO<string> = {
      username: dto.username,
      role: dto.role,
    };

    const token = {
      refreshToken: this.jwtService.sign(payload),
    };

    const newToken = await this.createToken(token.refreshToken);

    return newToken.token;
  }

  async refreshToken(token: string): Promise<JwtTokenEntity> {
    const currentToken = await this.findToken(token);

    if (currentToken) {
      currentToken.token = token;
    }

    return currentToken;
  }

  async findToken(token: string): Promise<JwtTokenEntity> {
    const currentToken = await this.jwtTokenEntity.findOne({
      where: { token },
    });

    return currentToken;
  }

  verifyToken(token: string) {
    return this.jwtService.verify(token);
  }

  async decryptedToken(token: string) {
    return this.jwtService.decode(token);
  }

  async deleteToken(thatToken: string): Promise<string> {
    const { token } = await this.findToken(thatToken);

    await this.deleteToken(token);

    return token;
  }

  private async updateToken(jwtToken: string, dto: any): Promise<string> {
    const { token } = await this.findToken(jwtToken);

    await this.jwtTokenEntity.update(token, dto);

    return token;
  }

  private async createToken(token: string): Promise<JwtTokenEntity> {
    const newToken = await this.jwtTokenEntity.create({ token });

    await this.jwtTokenEntity.save(newToken);

    return newToken;
  }
}
