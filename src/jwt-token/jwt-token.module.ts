import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import JwtTokenEntity from '../entities/jwt-token.entity';
import UserEntity from '../entities/users.entity';
import { JwtTokenService } from './jwt-token.service';

@Module({
  providers: [JwtTokenService],
  imports: [
    TypeOrmModule.forFeature([UserEntity, JwtTokenEntity]),

    JwtModule.register({
      secret: process.env.JWT_TOKEN,
      signOptions: {
        expiresIn: '5h',
      },
    }),
  ],
  exports: [JwtTokenService],
})
export class JwtTokenModule {}
