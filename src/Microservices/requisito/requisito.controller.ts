import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { requisitoDTO } from '../DTO/requisito.DTO';
import { firstValueFrom } from 'rxjs';
import { FailResponse, PaginatedSuccessResponse, SuccessResponse } from 'src/Response/Responses';
import { PaginationDto } from 'src/Pagination/PaginationDTO';

@Controller('requisito')
export class RequisitoController {
    constructor(@Inject('NAT_Service') private readonly client: ClientProxy){}
    @ApiTags('Rol')
    @Post()
    async Create(@Body() Rol: requisitoDTO) {
      try {
        const Data = await firstValueFrom(
          this.client.send({ cmd: 'CreateRequisito' }, Rol),
        );
        return SuccessResponse(Data);
      } catch (error) {
        return FailResponse();
      }
    }
  
    @ApiTags('Rol')
    @Get()
    async GetAll(@Query() Pagination: PaginationDto) {
      try {
        const data = await firstValueFrom(
          this.client.send({ cmd: 'GetAllRequisito' }, Pagination),
        );
        return PaginatedSuccessResponse(data);
      } catch (e) {
        return FailResponse(e);
      }
    }
  
    @ApiTags('Rol')
    @Get(':id')
    async Get(@Param('id') id: number) {
      try {
        const data = await firstValueFrom(
          this.client.send({ cmd: 'GetRequisito' }, id),
        );
        return SuccessResponse(data);
      } catch (e) {
        return FailResponse(e);
      }
    }
  
    @ApiTags('Rol')
    @Put(':id')
    async Update(@Param('id') id: number, @Body() RequisitoData: requisitoDTO) {
      try {
        const data = await firstValueFrom(
          this.client.send({ cmd: 'UpdateRequisito' }, { id, RequisitoData }),
        );
        return SuccessResponse(data);
      } catch (e) {
        return FailResponse(e);
      }
    }
  
    @ApiTags('Rol')
    @Delete(':id')
    async Delete(@Param('id') id: number) {
      try {
        const data = await firstValueFrom(
          this.client.send({ cmd: 'DeleteRequisito' }, id),
        );
        return SuccessResponse(data);
      } catch (e) {
        return FailResponse(e);
      }
    }
  
    @ApiTags('Rol')
    @Put(':id/restore')
    async Restore(@Param('id') id: number) {
      try {
        const data = await firstValueFrom(
          this.client.send({ cmd: 'RestoreRequisito' }, id),
        );
      } catch (error) {
        return FailResponse(error);
      }
    }
}
