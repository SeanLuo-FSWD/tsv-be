import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './session.serializer';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [
    UserModule, 
    PassportModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../', 'build'),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}
