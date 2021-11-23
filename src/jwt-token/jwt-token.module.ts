import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import JwtTokenEntity from 'src/entities/jwt-token.entity';
import UserEntity from 'src/entities/users.entity';
import { JwtTokenController } from './jwt-token.controller';
import { JwtTokenService } from './jwt-token.service';

@Module({
  controllers: [JwtTokenController],
  providers: [JwtTokenService],
  imports: [TypeOrmModule.forFeature([UserEntity, JwtTokenEntity])],
})
export class JwtTokenModule {}
