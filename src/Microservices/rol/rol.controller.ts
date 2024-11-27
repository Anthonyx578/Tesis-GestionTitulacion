import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Get,
  Put,
  Delete,
  Query,
  Param,
  UseGuards,
} from '@nestjs/common';
import { rolDTO } from '../DTO/rol.create';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import {
  FailResponse,
  PaginatedSuccessResponse,
  SuccessResponse,
} from 'src/Response/Responses';
import { PaginationDto } from 'src/Pagination/PaginationDTO';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { firstValueFrom } from 'rxjs';

@Controller('rol')
export class RolController {
  constructor(@Inject('NAT_Service') private readonly client: ClientProxy) {}

  @ApiTags('Rol')
  @Post()
  async Create(@Body() Rol: rolDTO) {
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
