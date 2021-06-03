import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, pw: string) {
    const user = await this.userService.findOneByEmailPw(email, pw);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
