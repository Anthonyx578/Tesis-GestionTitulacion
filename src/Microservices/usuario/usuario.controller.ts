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
import { UsuarioCreateDTO } from '../DTO/usuario.Create.DTO';
import {
  FailResponse,
  PaginatedSuccessResponse,
  SuccessResponse,
} from 'src/Response/Responses';
import { PaginationDto } from 'src/Pagination/PaginationDTO';
import { UsuarioUpdateDTO } from '../DTO/usuario.Update.DTO';
import { firstValueFrom } from 'rxjs';

@Controller('usuario')
export class UsuarioController {
  constructor(@Inject('NAT_Service') private readonly client: ClientProxy) {}

  @ApiTags('Usuario')
  @Post()
  async Create(@Body() Usuario: UsuarioCreateDTO) {
    try {
      const Data = await firstValueFrom(
        this.client.send({ cmd: 'CreateUsuario' }, Usuario),
      );
      return SuccessResponse(Data);
    } catch (error) {
      return FailResponse();
    }
  }

  @ApiTags('Usuario')
  @Get()
  async GetAll(@Query() Pagination: PaginationDto) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'GetAllUsuario' }, Pagination),
      );
      return PaginatedSuccessResponse(data);
    } catch (e) {
      return FailResponse(e);
    }
  }

  @ApiTags('Usuario')
  @Get(':id')
  async Get(@Param('id') id: number) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'GetUsuario' }, id),
      );
      return SuccessResponse(data);
    } catch (e) {
      return FailResponse(e);
    }
  }
  @ApiTags('Usuario')
  @Put(':id')
  async Update(@Param('id') id: number, @Body() UsuarioData: UsuarioUpdateDTO) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'UpdateUsuario' }, { id, UsuarioData }),
      );
      return SuccessResponse(data);
    } catch (e) {
      return FailResponse(e);
    }
  }

  @ApiTags('Usuario')
  @Delete(':id')
  async Delete(@Param('id') id: number) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'DeleteUsuario' }, id),
      );
      return SuccessResponse(data);
    } catch (e) {
      return FailResponse(e);
    }
  }

  @ApiTags('Usuario')
  @Put(':id/restore')
  async Restore(@Param('id') id: number) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'RestoreUsuario' }, id),
      );
      return SuccessResponse(data);
    } catch (error) {
      return FailResponse(error);
    }
  }
}
