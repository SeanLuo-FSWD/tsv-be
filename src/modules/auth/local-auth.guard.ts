import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    console.log('when is this canActivate called?');

    const result = (await super.canActivate(context)) as boolean;
    // const result = true;

    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  }
}
