import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { stringify } from 'querystring';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UserService } from '../user/user.service';
import { AccountProps } from './constants/enums';

const clientID =
  '100150715003-ait5alj0t5ic08prl7dl5vku2a0va4tr.apps.googleusercontent.com';
const clientSecret = '7D8-2NA-we0u6MIIkI71QvWx';
const callbackURL = '/api/auth/google/callback';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly userService: UserService) {
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
    console.log('validate inside googleStrategy - profile');
    console.log(profile);

    if (!profile) {
      console.log('Exception inside GoogleStrategy');

      throw new HttpException(
        'Wrong Google credentials, please try again',
        HttpStatus.NOT_FOUND,
      );
    }

    const foundUser = await this.userService.findOneByType({
      [AccountProps.USERID]: profile.id,
    });

    console.log('foundUser foundUser foundUser');
    console.log(foundUser);

    if (!foundUser) {
      const userObj = {
        userId: profile.id,
        username: profile.displayName,
        accountType: 'google',
      };

      console.log('userObj');
      console.log(userObj);

      const createdUser = await this.userService.userCreate(userObj);

      console.log('createdUser createdUser createdUser');
      console.log(createdUser);

      return {
        _id: createdUser._id,
        accessToken,
      };
    }

    return {
      _id: foundUser._id,
      accessToken,
    };
    // done(null, user);
  }
}
