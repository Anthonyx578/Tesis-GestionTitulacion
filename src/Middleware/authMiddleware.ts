import { Inject, Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Request, Response, NextFunction } from 'express';
import { FailResponse } from "src/Response/Responses";


@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(@Inject('NAT_Service') private readonly client:ClientProxy ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['authuleamtk'];
    /*
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    try {
      this.client.send(
        'auth.verify.user',token
      )*/
      next();
     /* 
    } catch (error) {
      return FailResponse(error)
    }*/
    
  }
}