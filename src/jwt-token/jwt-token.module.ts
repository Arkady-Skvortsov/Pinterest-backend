import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
      useFactory: async (configService: ConfigService) => {
        const options: JwtModuleOptions = {
          privateKey: configService.get('JWT_TOKEN'),
          signOptions: {
            expiresIn: '5h',
          },
        };

        return options;
      },
    }),
  ],
  exports: [JwtTokenService],
})
export class JwtTokenModule {}
