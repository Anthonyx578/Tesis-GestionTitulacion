import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { UsuarioCreateDTO } from '../DTO/usuario.Create.DTO';
import { ClientProxy } from '@nestjs/microservices';
import { FailResponse } from 'src/Response/Responses';
import * as cookieParser from 'cookie-parser';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

@Controller('authenticacion')
export class AuthenticacionController {
  constructor(@Inject('NAT_Service') private readonly client: ClientProxy) {}
  @Post()
  async login(@Body() Login: UsuarioCreateDTO, @Res() response: Response) {
    try {
      const login = await firstValueFrom(
        this.client.send({ cmd: 'Login' }, Login),
      );
      response.cookie('authuleamtk', login, {
        httpOnly: true,
        secure: false,
        maxAge: 2 * 60 * 60 * 1000,
      });
      return response.send('Sesion iniciada con exito');
    } catch (error) {
      return FailResponse(error);
    }
  }
}
