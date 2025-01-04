import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { UsuarioCreateDTO } from '../DTO/usuario.Create.DTO';
import { ClientProxy } from '@nestjs/microservices';
import { FailResponse } from 'src/Response/Responses';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { log } from 'console';
import { ExeptValidator } from 'src/ExceptionValidator/ExceptionValidator';

@Controller('authenticacion')
export class AuthenticacionController {
  constructor(@Inject('NAT_Service') private readonly client: ClientProxy) {}
  @ApiTags('Auth')
  @Post()
  async login(@Body() Login: UsuarioCreateDTO, @Res() response: Response) {
    try {
      const login: {
        id_usuario: number;
        nombre_usuario: string;
        RolName: string;
        CarreraName: string;
      } = await firstValueFrom(this.client.send({ cmd: 'Login' }, Login));
      if (!login.RolName) {
        throw new HttpException('no se obtuvo rol', HttpStatus.BAD_REQUEST);
      }
      if (login.RolName === 'profesor') {
        const Docente:{id_usuario:number,id_docente_tutor:number,status:number} = await firstValueFrom(
          this.client.send({ cmd: 'GetDocenteTutorByUser' }, login.id_usuario),
        );
        const Jurado:{id_usuario:number,id_jurado:number,status:number} = await firstValueFrom(
          this.client.send({ cmd: 'GetJuradoByUser' }, login.id_usuario),
        );
        const payload = {...login,idDocenteTutor:Docente.id_docente_tutor,idJurado:Jurado.id_jurado};
        const Token = await firstValueFrom(
          this.client.send({ cmd: 'Token' }, { payload, Rol: login.RolName }),
        );
        response.cookie('authuleamtk', Token, {
          httpOnly: true,
          secure: false,
          maxAge: 2 * 60 * 60 * 1000,
        });
        return response.send('Sesion iniciada con exito');
      }
      if (login.RolName === 'estudiantes') {
        console.log(login.RolName)
        const Estudiante:{id_usuario:number,id_estudiante:number,status:number} = await firstValueFrom(
          this.client.send({ cmd: 'GetEstudiantebyUser' }, login.id_usuario),
        );
        console.log(Estudiante)
        const payload = {...login,idEstudiante:Estudiante.id_estudiante};
        const Token = await firstValueFrom(
          this.client.send({ cmd: 'Token' }, { payload, Rol: login.RolName }),
        );
        response.cookie('authuleamtk', Token, {
          httpOnly: true,
          secure: false,
          maxAge: 2 * 60 * 60 * 1000,
        });
        return response.send('Sesion iniciada con exito');
      }
      const Token = await firstValueFrom(
        this.client.send({ cmd: 'Token' }, { payload:login, Rol: login.RolName }),
      );
      response.cookie('authuleamtk', Token, {
        httpOnly: true,
        secure: false,
        maxAge: 2 * 60 * 60 * 1000,
      });
      return response.send('Sesion iniciada con exito');
    } catch (error) {
      console.log(error);
      return FailResponse(ExeptValidator(error));
    }
  }
}
