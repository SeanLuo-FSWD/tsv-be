import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    console.log('1111111111111111111111');
    console.log('serializeUser called to set cookie and session');

    done(null, { id: user.id });
    // done(null, {id: user.id}); // should only store id.
  }
  deserializeUser(
    payload: any,
    done: (err: Error, payload: string) => void,
  ): any {
    console.log('2222222222222222');
    console.log('deserializeUser called to attach to req.user');
    console.log(payload);

    done(null, payload);
  }
}
