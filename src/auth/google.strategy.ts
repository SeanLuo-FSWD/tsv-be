import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { stringify } from 'querystring';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

const clientID =
  '100150715003-ait5alj0t5ic08prl7dl5vku2a0va4tr.apps.googleusercontent.com';
const clientSecret = '7D8-2NA-we0u6MIIkI71QvWx';
const callbackURL = '/api/auth/google/callback';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '100150715003-ait5alj0t5ic08prl7dl5vku2a0va4tr.apps.googleusercontent.com',
      clientSecret: '7D8-2NA-we0u6MIIkI71QvWx',
      callbackURL: '/api/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    console.log('validate inside googleStrategy');

    if (!profile) {
      console.log('Exception inside GoogleStrategy');

      throw new HttpException(
        'Wrong Google credentials, please try again',
        HttpStatus.NOT_FOUND,
      );
    }

    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };

    return user;
    // done(null, user);
  }
}
