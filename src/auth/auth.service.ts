import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

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

  async signJwt(user: any) {
    console.log('2222222222222222');
    console.log('auth.service.ts - signJwt : user');
    console.log(user);

    const payload = { username: user.username, sub: user.userId };
    console.log('payload');
    console.log(payload);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
