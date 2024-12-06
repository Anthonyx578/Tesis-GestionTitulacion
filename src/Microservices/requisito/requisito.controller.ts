import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { requisitoDTO } from '../DTO/requisito.DTO';
import { firstValueFrom } from 'rxjs';

@Controller('requisito')
export class RequisitoController {
    constructor(@Inject('NAT_Service') private readonly client: ClientProxy){}
    @ApiTags('Rol')
    @Post()
    async Create(@Body() Rol: requisitoDTO) {
      try {
        const Data = await firstValueFrom(
          this.client.send({ cmd: 'CreateRol' }, Rol),
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
          this.client.send({ cmd: 'GetAllRol' }, Pagination),
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
          this.client.send({ cmd: 'GetRol' }, id),
        );
        return SuccessResponse(data);
      } catch (e) {
        return FailResponse(e);
      }
    }
  
    @ApiTags('Rol')
    @Put(':id')
    async Update(@Param('id') id: number, @Body() RolData: rolDTO) {
      try {
        const data = await firstValueFrom(
          this.client.send({ cmd: 'UpdateRol' }, { id, RolData }),
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
          this.client.send({ cmd: 'DeleteRol' }, id),
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
          this.client.send({ cmd: 'RestoreRol' }, id),
        );
      } catch (error) {
        return FailResponse(error);
      }
    }
}
