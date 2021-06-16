import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, pw: string) {
    // const passwordHash = await bcrypt.hash(pw, 10);
    const user = await this.userService.findOneByEmailPw(email, pw);

    if (user) {
      const userObj = {
        userId: user._id,
        username: user.username,
        email: user.email,
      };

      console.log('auth.service.ts - validateUser : userObj');
      console.log(userObj);

      return userObj;
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
