import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import JwtTokenEntity from '../entities/jwt-token.entity';
import UserEntity from '../entities/users.entity';
import { JwtTokenService } from './jwt-token.service';

@Module({
  providers: [JwtTokenService],
  imports: [
    TypeOrmModule.forFeature([UserEntity, JwtTokenEntity]),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => {
        const options: JwtModuleOptions = {
          privateKey: process.env.JWT_TOKEN,
          signOptions: {
            expiresIn: '5h',
          },
        };

        return options;
      },
    }),
  ],
  exports: [JwtTokenService, JwtModule],
})
export class JwtTokenModule {}
