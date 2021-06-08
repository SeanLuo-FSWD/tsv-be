import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

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

    return this.authService.signJwt(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
