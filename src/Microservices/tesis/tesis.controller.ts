import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { FailResponse, PaginatedSuccessResponse, SuccessResponse } from 'src/Response/Responses';
import { tesisDTO } from '../DTO/tesis.DTO';
import { PaginationDto } from 'src/Pagination/PaginationDTO';

@Controller('tesis')
export class TesisController {
    constructor(@Inject('NAT_Service') private readonly client:ClientProxy){}

    @ApiTags('Tesis')
    @Post()
    async Create(@Body() Tesis: tesisDTO) {
      try {
        const Data = await firstValueFrom(
          this.client.send({ cmd: 'CreateTesis' }, Tesis),
        );
        return SuccessResponse(Data);
      } catch (error) {
        return FailResponse(error);
      }
    }
  
    @ApiTags('Tesis')
    @Get()
    async GetAll(@Query() Pagination: PaginationDto) {
      try {
        const data = await firstValueFrom(
          this.client.send({ cmd: 'GetAllTesis' }, Pagination),
        );
        return PaginatedSuccessResponse(data);
      } catch (e) {
        return FailResponse(e);
      }
    }
  
    @ApiTags('Tesis')
    @Get('Like/:search')
    async GetAllLike(@Query() Pagination: PaginationDto,@Param('search')Like:string) {
      try {
        const data = await firstValueFrom(
          this.client.send({ cmd:'GetAllLikeTesis'},{Pagination,Like}),
        );
        return PaginatedSuccessResponse(data);
      } catch(e){
        return FailResponse(e);
      }
    }

    @ApiTags('Tesis')
    @Get(':id')
    async Get(@Param('id') id: number) {
      try {
        const data = await firstValueFrom(
          this.client.send({ cmd: 'GetTesis' }, id),
        );
        return SuccessResponse(data);
      } catch (e) {
        return FailResponse(e);
      }
    }
  
    @ApiTags('Tesis')
    @Put(':id')
    async Update(@Param('id') id: number, @Body() TesisData: tesisDTO) {
      try {
        const data = await firstValueFrom(
          this.client.send({ cmd: 'UpdateTesis' }, { id, TesisData }),
        );
        return SuccessResponse(data);
      } catch (e) {
        return FailResponse(e);
      }
    }
  
    @ApiTags('Tesis')
    @Delete(':id')
    async Delete(@Param('id') id: number) {
      try {
        const data = await firstValueFrom(
          this.client.send({ cmd: 'DeleteTesis' }, id),
        );
        return SuccessResponse(data);
      } catch (e) {
        return FailResponse(e);
      }
    }
  
    @ApiTags('Tesis')
    @Put(':id/restore')
    async Restore(@Param('id') id: number) {
      try {
        const data = await firstValueFrom(
          this.client.send({ cmd: 'RestoreTesis' }, id),
        );
      } catch (error) {
        return FailResponse(error);
      }
    }
}
