import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { ClientProxy } from '@nestjs/microservices';
  
  import { Request } from 'express';
  import { firstValueFrom } from 'rxjs';
  import * as cookieParser from 'cookie-parser';

  @Injectable()
  export class AuthGuard implements CanActivate {
  
    constructor(
      @Inject( 'NATS_Service' ) private readonly client: ClientProxy, 
    ) {}
  
  
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
  
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromCookie(request);
      if (!token) {
        throw new UnauthorizedException('Token not found');
      }
      try {
  
        const payload = await firstValueFrom(
          this.client.send('auth.verify.user', token)
        );
        /*
        request['user'] = user;
        request['token'] = newToken;
        */
  
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromCookie(request: Request): string | undefined {
        /*
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined; */
      return request.cookies?.authuleamtk 
    }
  }