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
import { ExeptValidator } from 'src/ExceptionValidator/ExceptionValidator';

@Controller('sustentacion')
export class SustentacionController {
  constructor(@Inject('NAT_Service') private readonly client: ClientProxy) {}

  @ApiTags('Sustentacion')
  @Post()
  async Create(@Body() sustentacion: sustentacionDTO) {
    try {
      //Validamos su existencia
      if (sustentacion.id_carrera || sustentacion.id_carrera == 0) {
        const ExistCarrera = await firstValueFrom(
          this.client.send({ cmd: 'GetCarrera' }, sustentacion.id_carrera),
        );
        if (!ExistCarrera) {
          return BadRequestResponse('Carrera no valida');
        }
      }
      if(sustentacion.id_tesis || sustentacion.id_carrera == 0){ 
        const ExistTesis = await firstValueFrom(
          this.client.send({ cmd: 'GetTesis' }, sustentacion.id_tesis),
        );
        if(!ExistTesis){
          return BadRequestResponse('Tesis no valida');
        }
      }
      const Sustentacion = await firstValueFrom(
        this.client.send({ cmd: 'CreateSustentacion' }, sustentacion),
      );
      return SuccessResponse(Sustentacion);
    } catch (e) {
      return FailResponse(ExeptValidator(e));
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
