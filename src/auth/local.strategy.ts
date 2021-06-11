import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    console.log('000000000000000000000');
    console.log('inside local.strategy, login hit?');

    const user = await this.authService.validateUser(email, password);
    if (!user) {
      console.log('why exception not matter');

      throw new UnauthorizedException(
        'fasdfsdfsd',
        'Please check your login credentials',
      );
    }
    return user;

    // return user;
  }
}
