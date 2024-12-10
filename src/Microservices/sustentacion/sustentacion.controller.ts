import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/Pagination/PaginationDTO';
import { BadRequestResponse, FailResponse, PaginatedSuccessResponse, SuccessResponse } from 'src/Response/Responses';
import { sustentacionDTO } from './DTO/sustentacion.DTO';

@Controller('sustentacion')
export class SustentacionController {
    constructor(@Inject('NAT_Service') private readonly client: ClientProxy) {}

  @ApiTags('Sustentacion')
  @Post(':id_usuario')
  async Create(@Param('id_usuario') id_usuario: number) {
    try {
      //Validamos su existencia
      const Exist = await firstValueFrom(
        this.client.send({ cmd: 'GetSustentacion' }, id_usuario),
      );
      if (!Exist) {
        return BadRequestResponse(
          'El usuario con el que se quiere crear no existe',
        );
      }
      const Usuario = await firstValueFrom(
        this.client.send({ cmd: 'CreateSustentacion' }, id_usuario),
      );
      return SuccessResponse(Usuario);
    } catch (error) {
      return FailResponse(error);
    }
  }

  @ApiTags('Sustentacion')
  @Get()
  async GetAll(@Query() Pagination: PaginationDto) {
    try {
      const Data = await firstValueFrom(
        this.client.send({ cmd: 'GetAllSustentacion' }, Pagination),
      );
      console.log(Data);
      return PaginatedSuccessResponse(Data);
    } catch (e) {
      return FailResponse(e);
    }
  }

  @ApiTags('Sustentacion')
  @Get(':id')
  async Get(@Param('id') id: number) {
    try {
      const data = await firstValueFrom(this.client
        .send({ cmd: 'GetSustentacion' }, id));
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
        this.client.send({ cmd: 'UpdateSustentacion' }, { id, SustentacionData }),
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
