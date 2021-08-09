import { PassportSerializer } from '@nestjs/passport';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(payload: any, done: (err: Error, user: any) => void): any {
    console.log('1111111111111111111111');
    console.log('serializeUser called to set cookie and session');
    console.log(payload._id);

    // done(null, { id: user.userId });
    done(null, { _id: payload._id });
  }
  async deserializeUser(
    payload: any,
    done: (err: Error, user?: User) => void,
  ): Promise<any> {
    console.log('2222222222222222');
    console.log('deserializeUser called to attach to req.user');
    console.log(payload);

    let user = await this.userService.findOneById(payload._id);
    console.log('deserializeUser : user');
    console.log(user);

    if (user) {
      done(null, user);
    } else {
      //   throw new HttpException(
      //     'User not found, please try login again',
      //     HttpStatus.NOT_FOUND,
      //   );
      done(
        new HttpException(
          'User not found, please try login again',
          HttpStatus.NOT_FOUND,
        ),
        null,
      );
    }
  }
}
