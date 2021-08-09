import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  HttpException,
  Injectable,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const _id = await this.authService.validateUser(email, password);
    if (!_id) {
      console.log('why exception not matter');

      throw new HttpException(
        'Wrong credentials, please try again',
        HttpStatus.NOT_FOUND,
      );
    }
    return { _id };
    // return null;
  }
}
