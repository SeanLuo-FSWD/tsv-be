import { Controller, Req, Post, UseGuards, Get, Res } from '@nestjs/common';
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
  async login(@Req() req) {
    // throw new HttpException('Forbiddenzzzzzzz', 408);
    console.log('so this is still called with auth.controller?');
    console.log(req.user);

    return req.user;
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleLogin(@Req() req) {
    console.log('gLogin in auth.controller - callable?');
    console.log(req.user);

    return req.user;
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Req() req, @Res() res) {
    console.log('Google redirect callback called');
    res.redirect('http://localhost:3000/home');
    // return this.authService.googleRedirect(req);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('authenticate')
  getProfile(@Req() req): string {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('logout')
  logout(@Req() req) {
    req.logout();
  }
}
