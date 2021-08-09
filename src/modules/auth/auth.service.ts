import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, pw: string) {
    // const passwordHash = await bcrypt.hash(pw, 10);
    console.log('validateUser');

    const user = await this.userService.verifyLogin(email, pw);

    if (user) {
      // const userObj = {
      //   userId: user._id,
      //   username: user.username,
      //   email: user.email,
      // };

      // return userObj;
      console.log('88888888888888888888');
      console.log(user._id);

      return user._id;
    }
    return null;
  }

  googleRedirect(req) {
    console.log('googleRedirect --- req.user ' + req.user);

    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
