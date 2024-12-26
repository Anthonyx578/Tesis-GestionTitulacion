import {
  Body,
  ConsoleLogger,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  BadRequestResponse,
  FailResponse,
  FailServiceResponse,
  PaginatedMappedResponse,
  PaginatedSuccessResponse,
  SuccessResponse,
} from 'src/Response/Responses';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/Pagination/PaginationDTO';
import { EstudianteUpdateDTO } from '../DTO/estudiante.Update.DTO';
import { firstValueFrom } from 'rxjs';
import { estudiante } from './Entity/estudiante.entity';
import { ExeptValidator } from 'src/ExceptionValidator/ExceptionValidator';
import { estudianteGetName } from './Entity/estudianteGetName';

@Controller('estudiante')
export class EstudianteController {
  constructor(@Inject('NAT_Service') private readonly client: ClientProxy) {}

  @ApiTags('Estudiante')
  @Post(':id_usuario')
  async Create(@Param('id_usuario') id_usuario: number) {
    try {
      //Validamos su existencia
      const Exist = await firstValueFrom(
        this.client.send({ cmd: 'GetUsuario' }, id_usuario),
      );
      if (!Exist) {
        return BadRequestResponse(
          'El usuario con el que se quiere crear no existe',
        );
      }
      const Usuario = await firstValueFrom(
        this.client.send({ cmd: 'CreateEstudiante' }, id_usuario),
      );
      return SuccessResponse(Usuario);
    } catch (e) {
        return FailResponse(ExeptValidator(e));
    }
  }

  @ApiTags('Estudiante')
  @Get()
  @ApiQuery({ name: 'Like', required: false })
  async GetAll(
    @Query() Pagination: PaginationDto,
    @Query('Like') Like: string,
  ) {
    try {
      const DataEstudiante = await firstValueFrom(
        this.client.send<{ Data: estudiante[]; meta: any }>(
          { cmd: 'GetAllEstudiante' },
          { Pagination, Like },
        ),
      );
      //Obtenemos el apartado de data de la respuesta
      const { Data } = DataEstudiante;
      //Completamos los datos con los de usuario
      const CompleteData = await Promise.all(
        Data.map(async (estudiante) => {
          const UserData = await firstValueFrom(
            this.client.send({ cmd: 'GetUsuario' }, estudiante.id_usuario),
          );
          return { ...UserData, ...estudiante };
        }),
      );
      //console.log(CompleteData)
      return PaginatedSuccessResponse({
        data: CompleteData,
        meta: DataEstudiante.meta,
      });
    } catch (e) {
      /*if(!noConectionValidator(e)){
        return FailResponse(e);
      }*/
      return FailResponse(e);
    }
  }

  @ApiTags('Estudiante')
  @Get('/names')
  async GetAllNames() {
    try {
      const Data: estudianteGetName[] = await firstValueFrom(
        this.client.send({ cmd: 'GetAllEstudianteNames' }, {}),
      );
      const CompleteData = await Promise.all(
        Data.map(async (estudiante) => {
          const UserData = await firstValueFrom(
            this.client.send({ cmd: 'GetUsuarioNames' }, estudiante.id_usuario),
          );
          if (UserData != null) {
            const { id_estudiante } = estudiante;
            const { nombres, apellidos } = UserData;
            return { id_estudiante, nombres, apellidos };
          }
          return;
        }),
      );
      //console.log(CompleteData)
      return PaginatedMappedResponse(CompleteData);
    } catch (e) {
      /*if(!noConectionValidator(e)){
        return FailResponse(e);
      }*/
      return FailResponse(e);
    }
  }

  @ApiTags('Estudiante')
  @Get(':id')
  async Get(@Param('id') id: number) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'GetEstudiante' }, id),
      );
      const { id_usuario } = data;
      const userData = await firstValueFrom(
        this.client.send({ cmd: 'GetUsuario' }, id_usuario),
      );
      console.log(userData);
      const MapedData = { ...userData, ...data };
      return SuccessResponse(MapedData);
    } catch (e) {
        return FailResponse(ExeptValidator(e));
    }
  }

  @ApiTags('Estudiante')
  @Get('ByUser/:id_usuario')
  async GetbyUser(@Param('id_usuario') id: number) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'GetEstudiantebyUser' }, id),
      );
      const userData = await firstValueFrom(
        this.client.send({ cmd: 'GetUsuario' }, id),
      );
      const MapedData = { ...userData, ...data };
      return SuccessResponse(MapedData);
    } catch (e) {
        return FailResponse(ExeptValidator(e));
    }
  }

  @ApiTags('Estudiante')
  @Put(':id')
  async Update(
    @Param('id') id: number,
    @Body() EstudianteData: EstudianteUpdateDTO,
  ) {
    try {
      //Validacion
      const Idtesis = EstudianteData.id_tesis;
      if (Idtesis) {
        const Exist = await firstValueFrom(
          this.client.send({ cmd: 'GetTesis' }, Idtesis),
        );
        if (!Exist) {
          return 'Tesis no valida';
        }
      }
      //Modificacion
      const data = await firstValueFrom(
        this.client.send({ cmd: 'UpdateEstudiante' }, { id, EstudianteData }),
      );
      return SuccessResponse(data);
    } catch (e) {
        return FailResponse(ExeptValidator(e));
    }
  }

  @ApiTags('Estudiante')
  @Delete(':id')
  async Delete(@Param('id') id: number) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'DeleteEstudiante' }, id),
      );
      return SuccessResponse(data);
    } catch (e) {
      return FailResponse(e);
    }
  }

  @ApiTags('Estudiante')
  @Put(':id/restore')
  async Restore(@Param('id') id: number) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'RestoreEstudiante' }, id),
      );
      return SuccessResponse(data);
    } catch (error) {
      return FailResponse(error);
    }
  }
}
