import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
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
    // return req.user;
    console.log('1111111111111111111111');
    console.log('app.controller : req.user');
    console.log(req.user);
    // throw new HttpException('Forbiddenzzzzzzz', 408);
    throw new HttpException(
      {
        status: 407,
        error: 'This is a custom message',
      },
      408,
    );

    // return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  getProfile(@Request() req): string {
    console.log('2222222222222222');
    console.log('looks like ur good : req.user');
    console.log(req.user);

    return `profile of ${req.user.username}`;
  }
}
