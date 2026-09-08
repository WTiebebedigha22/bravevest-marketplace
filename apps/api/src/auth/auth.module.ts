// apps/api/src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { TwoFactorService } from './two-factor.service';
import { EmailService } from '../email/email.service';

@Module({
  imports: [
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, TwoFactorService, EmailService],
  exports: [AuthService],
})
export class AuthModule {}