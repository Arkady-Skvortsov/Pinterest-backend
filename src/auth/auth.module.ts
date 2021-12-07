import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtTokenModule } from '../jwt-token/jwt-token.module';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [UsersModule, JwtTokenModule],
  exports: [AuthService],
})
export class AuthModule {}
