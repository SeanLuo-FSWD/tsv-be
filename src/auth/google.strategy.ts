import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(
      {
        clientID:
          '100150715003-ait5alj0t5ic08prl7dl5vku2a0va4tr.apps.googleusercontent.com',
        clientSecret: '7D8-2NA-we0u6MIIkI71QvWx',
        callbackURL: '/api/auth/google/callback',
      },
      function (_: any, __: any, profile: any, cb: any) {
        console.log('google login sucesssss');
        console.log(profile);

        cb(null, profile);
      },
    );
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      console.log('why exception not matter');

      throw new HttpException(
        'Wrong credentials, please try again',
        HttpStatus.NOT_FOUND,
      );
    }
    return user;

    // return user;
  }
}
