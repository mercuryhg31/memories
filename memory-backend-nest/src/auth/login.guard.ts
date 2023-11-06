import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LoginAuthGuard extends AuthGuard('login') {
  async canActivate(context) {
    const result = (await super.canActivate(context));
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result as boolean;
  }
}
