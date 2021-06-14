import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GoogleAuthGuard } from './google-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { AuthenticatedGuard } from './authenticated.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard('local')) // automatically provisioned for us when we extended the passport-local strategy.
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    // throw new HttpException('Forbiddenzzzzzzz', 408);
    console.log('so this is still called with auth.controller?');

    return req.user;
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(@Request() req) {
  //   // throw new HttpException('Forbiddenzzzzzzz', 408);

  //   return req.user;
  // }

  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  getProfile(@Request() req): string {
    return `profile of ${req.user.username}`;
  }
}
