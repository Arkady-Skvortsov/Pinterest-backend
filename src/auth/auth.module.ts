import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtTokenModule } from '../jwt-token/jwt-token.module';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';
import { UsersService } from '../users/users.service';

@Module({
  providers: [AuthService, UsersService],
  controllers: [AuthController],
  imports: [JwtTokenModule, UsersModule, RolesModule],
  exports: [AuthService],
})
export class AuthModule {}
