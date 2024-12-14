import {
  Body,
  Controller,
  Inject,
  Post,
  Put,
  Delete,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/Pagination/PaginationDTO';
import {
  FailResponse,
  PaginatedSuccessResponse,
  SuccessResponse,
} from 'src/Response/Responses';
import { carreraDTO } from '../DTO/carreraDTO';
import { firstValueFrom } from 'rxjs';

@Controller('carrera')
export class CarreraController {
  constructor(@Inject('NAT_Service') private readonly client: ClientProxy) {}

  
  @ApiTags('Carrera')
  @Post()
  async Create(@Body() Carrera: carreraDTO) {
    try {
      const Data = await firstValueFrom(
        this.client.send({ cmd: 'CreateCarrera' }, Carrera),
      );
    } catch (error) {
      return FailResponse(error);
    }
  }

  @ApiTags('Carrera')
  @Get()
  async GetAll(@Query() Pagination: PaginationDto) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'GetAllCarrera' }, Pagination),
      );
      return PaginatedSuccessResponse(data);
    } catch (e) {
      return FailResponse(e);
    }
  }
  @ApiTags('Carrera')
  @Get('like/:search')
  async GetAllLike(@Query() Pagination: PaginationDto,@Param('search') Like:string) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'GetAllLikeCarrera' }, {Pagination,Like}),
      );
      return PaginatedSuccessResponse(data);
    } catch (e) {
      return FailResponse(e);
    }
  }

  @ApiTags('Carrera')
  @Get(':id')
  async Get(@Param('id') id: number) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'GetCarrera' }, id),
      );
      return SuccessResponse(data);
    } catch (e) {
      return FailResponse(e);
    }
  }

  @ApiTags('Carrera')
  @Put(':id')
  async Update(@Param('id') id: number, @Body() CarreraData: carreraDTO) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'UpdateCarrera' }, { id, CarreraData }),
      );
      return SuccessResponse(data);
    } catch (e) {
      return FailResponse(e);
    }
  }

  @ApiTags('Carrera')
  @Delete(':id')
  async Delete(@Param('id') id: number) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'DeleteCarrera' }, id),
      );
      return SuccessResponse(data);
    } catch (e) {
      return FailResponse(e);
    }
  }

  @ApiTags('Carrera')
  @Put(':id/restore')
  async Restore(@Param('id') id: number) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'RestoreCarrera' }, id),
      );
      return SuccessResponse(data);
    } catch (error) {
      return FailResponse(error);
    }
  }
}
