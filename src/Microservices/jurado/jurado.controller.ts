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
import { PaginationDto } from 'src/Pagination/PaginationDTO';
import {
  BadRequestResponse,
  FailResponse,
  SuccessResponse,
} from 'src/Response/Responses';
import { juradoUpdateDTO } from '../DTO/juradoUpdateDTO';
import { firstValueFrom } from 'rxjs';
import { juradoGet } from './DataClass/juradoGet';

@Controller('jurado')
export class JuradoController {
  constructor(@Inject('NAT_Service') private readonly client: ClientProxy) {}

  @ApiTags('Jurado')
  @Post(':id_usuario')
  async Create(@Param('id_usuario') id_usuario: number) {
    try {
      //Validamos su existencia
      const Exist = await firstValueFrom(
        this.client.send({ cmd: 'GetUsuario' }, id_usuario),
      );
      if (!Exist) {
        return BadRequestResponse(
          'El usuario con el que se quiere crear no existe',
        );
      }
      const Usuario = await firstValueFrom(
        this.client.send({ cmd: 'CreateJurado' }, id_usuario),
      );
      return SuccessResponse(Usuario);
    } catch (error) {
      return FailResponse(error);
    }
  }

  @ApiTags('Jurado')
  @Get()
  async GetAll(@Query() Pagination: PaginationDto) {
    try {
      const data: { Data: juradoGet[]; meta: {} } = await firstValueFrom(
        this.client.send({ cmd: 'GetAllJurado' }, Pagination),
      );
      const {Data,meta} = data
      const JuradoMapped = await Promise.all(
        Data.map(async (jurado)=>{
          const UsuarioData = await firstValueFrom( this.client.send({cmd:'GetUsuario'},jurado.id_usuario))
          return {...jurado,...UsuarioData}
        })
      )
      return JuradoMapped;
    } catch (e) {
      return FailResponse(e);
    }
  }

  @ApiTags('Jurado')
  @Get(':id')
  async Get(@Param('id') id: number) {
    try {
      const data:juradoGet = await firstValueFrom(
        this.client.send({ cmd: 'GetJurado' }, id),
      );

      const UserData = await firstValueFrom(this.client.send({cmd:'GetUsuario'},data.id_usuario))
      const NewResponse = {...data,...UserData}
      return SuccessResponse(NewResponse);
    } catch (e) {
      return FailResponse(e);
    }
  }
  @ApiTags('Jurado')
  @Put(':id')
  async Update(@Param('id') id: number, @Body() JuradoData: juradoUpdateDTO) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'UpdateJurado' }, { id, JuradoData }),
      );
      return SuccessResponse(data);
    } catch (e) {
      return FailResponse(e);
    }
  }

  @ApiTags('Jurado')
  @Delete(':id')
  async Delete(@Param('id') id: number) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'DeleteJurado' }, id),
      );
      return SuccessResponse(data);
    } catch (e) {
      return FailResponse(e);
    }
  }

  @ApiTags('Jurado')
  @Put(':id/restore')
  async Restore(@Param('id') id: number) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'RestoreJurado' }, id),
      );
      return SuccessResponse(data);
    } catch (error) {
      return FailResponse(error);
    }
  }
}
