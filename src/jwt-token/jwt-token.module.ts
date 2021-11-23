import { Module } from '@nestjs/common';
import { JwtTokenController } from './jwt-token.controller';
import { JwtTokenService } from './jwt-token.service';

@Module({
  controllers: [JwtTokenController],
  providers: [JwtTokenService]
})
export class JwtTokenModule {}
