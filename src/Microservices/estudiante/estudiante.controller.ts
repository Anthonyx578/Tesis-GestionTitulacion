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
  PaginatedSuccessResponse,
  SuccessResponse,
} from 'src/Response/Responses';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/Pagination/PaginationDTO';
import { EstudianteUpdateDTO } from '../DTO/estudiante.Update.DTO';
import { firstValueFrom } from 'rxjs';
import { estudiante } from './Entity/estudiante.entity';

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
    } catch (error) {
      return FailResponse(error);
    }
  }

  @ApiTags('Estudiante')
  @Get()
  async GetAll(@Query() Pagination: PaginationDto) {
    try {
      const Data = await firstValueFrom(
        this.client.send<{ data: estudiante[]; meta: any }>(
          { cmd: 'GetAllEstudiante' },
          Pagination,
        ),
      );
      //Obtenemos el apartado de data de la respuesta
      const { data } = Data;
      //Completamos los datos con los de usuario
      const CompleteData = await Promise.all(
        data.map(async (estudiante) => {
          const UserData = await firstValueFrom(
            this.client.send({ cmd: 'GetUsuario' }, estudiante.id_usuario),
          );
          return { ...UserData, ...estudiante };
        }),
      );
      return PaginatedSuccessResponse({ data: CompleteData, meta: Data.meta });
    } catch (e) {
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
      return FailResponse(e);
    }
  }
  @ApiTags('Estudiante')
  @Put(':id')
  async Update(
    @Param('id') id: number,
    @Body() EstudiantesData: EstudianteUpdateDTO,
  ) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'UpdateEstudiante' }, { id, EstudiantesData }),
      );
      return SuccessResponse(data);
    } catch (e) {
      return FailResponse(e);
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
