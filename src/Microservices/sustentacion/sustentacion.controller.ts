import {
  Body,
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
import { ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/Pagination/PaginationDTO';
import {
  BadRequestResponse,
  FailResponse,
  PaginatedSuccessResponse,
  SuccessResponse,
} from 'src/Response/Responses';
import { sustentacionDTO } from './DTO/sustentacion.DTO';
import { noConectionValidator } from 'src/ExceptionValidator/ExceptionValidator';

@Controller('sustentacion')
export class SustentacionController {
  constructor(@Inject('NAT_Service') private readonly client: ClientProxy) {}

  @ApiTags('Sustentacion')
  @Post()
  async Create(@Body() sustentacion: sustentacionDTO) {
    try {
      //Validamos su existencia
      const { id_carrera, id_tesis } = sustentacion;
      const ExistTesis = await firstValueFrom(
        this.client.send({ cmd: 'GetTesis' }, id_tesis),
      );

      console.log('ExistTesis:', ExistTesis);

      const ExistCarrera = await firstValueFrom(
        this.client.send({ cmd: 'GetCarrera' }, id_carrera),
      );

      console.log('ExistCarrera:', ExistCarrera);

      if (!ExistTesis || !ExistCarrera) {
        return BadRequestResponse('Tesis o Carrera no valida');
      }
      const Sustentacion = await firstValueFrom(
        this.client.send({ cmd: 'CreateSustentacion' }, sustentacion),
      );

      console.log('Respuesta de Crear Sustentacion:', Sustentacion);

      return SuccessResponse(Sustentacion);
    } catch (e) {
      //if (!noConectionValidator(e)) {
        return FailResponse(e);
      //}
      /*return FailResponse(
        'Existen problemas con los demas servicios servicios',
      );*/
    }
  }

  @ApiTags('Sustentacion')
  @Get()
  async GetAll(@Query() Pagination: PaginationDto) {
    try {
      const Data = await firstValueFrom(
        this.client.send({ cmd: 'GetAllSustentacion' }, Pagination),
      );
      return PaginatedSuccessResponse(Data);
    } catch (e) {
      return FailResponse(e);
    }
  }

  @ApiTags('Sustentacion')
  @Get(':id')
  async Get(@Param('id') id: number) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'GetSustentacion' }, id),
      );
      return SuccessResponse(data);
    } catch (e) {
      return FailResponse(e);
    }
  }
  @ApiTags('Sustentacion')
  @Put(':id')
  async Update(
    @Param('id') id: number,
    @Body() SustentacionData: sustentacionDTO,
  ) {
    try {
      const data = await firstValueFrom(
        this.client.send(
          { cmd: 'UpdateSustentacion' },
          { id, SustentacionData },
        ),
      );
      return SuccessResponse(data);
    } catch (e) {
      return FailResponse(e);
    }
  }

  @ApiTags('Sustentacion')
  @Delete(':id')
  async Delete(@Param('id') id: number) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'DeleteSustentacion' }, id),
      );
      return SuccessResponse(data);
    } catch (e) {
      return FailResponse(e);
    }
  }

  @ApiTags('Sustentacion')
  @Put(':id/restore')
  async Restore(@Param('id') id: number) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'RestoreSustentacion' }, id),
      );
      return SuccessResponse(data);
    } catch (error) {
      return FailResponse(error);
    }
  }
}
