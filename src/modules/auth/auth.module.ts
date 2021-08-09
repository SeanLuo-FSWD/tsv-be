import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './session.serializer';
// import * as passportGoogle from 'passport-google-oauth2';
// const GoogleStrategy = passportGoogle.Strategy;

import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [UserModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}
