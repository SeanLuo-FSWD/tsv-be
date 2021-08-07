import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {UnauthorizedException} from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  // CanActivate required for custom guards

  async canActivate(context: ExecutionContext) {
    console.log('ggggggggggggggggggggggg');
    console.log('AuthenticatedGuard');
    const request = context.switchToHttp().getRequest();
    const isAuthenticated = request.isAuthenticated();
    console.log(isAuthenticated);
    
    // if (!isAuthenticated) {
    //   console.log('not authed');
      
    //   throw new UnauthorizedException(
    //     'You are not logged in yet',
    //   );
    // }

      return isAuthenticated; // from passport.
  }
}
