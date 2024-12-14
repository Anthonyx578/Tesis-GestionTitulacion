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
    @ApiTags('Requisito')
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
  
    @ApiTags('Requisito')
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
    @ApiTags('Requisito')
    @Get('Like/:search')
    async GetAllLike(@Query() Pagination: PaginationDto,@Param('search')Like:string) {
      try {
        const data = await firstValueFrom(
          this.client.send({ cmd: 'GetAllLikeRequisito' }, {Pagination,Like}),
        );
        return PaginatedSuccessResponse(data);
      } catch (e) {
        return FailResponse(e);
      }
    }

    @ApiTags('Requisito')
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
  
    @ApiTags('Requisito')
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
  
    @ApiTags('Requisito')
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
  
    @ApiTags('Requisito')
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
