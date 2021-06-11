import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  // CanActivate required for custom guards

  async canActivate(context: ExecutionContext) {
    console.log('ggggggggggggggggggggggg');
    console.log('AuthenticatedGuard');
    const request = context.switchToHttp().getRequest();

    return request.isAuthenticated(); // from passport.
  }
}
