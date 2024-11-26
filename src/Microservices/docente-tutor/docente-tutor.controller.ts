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
import { ApiTags } from '@nestjs/swagger';
import {
  BadRequestResponse,
  FailResponse,
  SuccessResponse,
} from 'src/Response/Responses';
import { docenteTutorUpdateDTO } from '../DTO/docenteTutorUpdateDTO';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/Pagination/PaginationDTO';
import { first, firstValueFrom } from 'rxjs';

@Controller('docente-tutor')
export class DocenteTutorController {
  constructor(@Inject('NAT_Service') private readonly client: ClientProxy) {}

  @ApiTags('DocenteTutor')
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
        this.client.send({ cmd: 'CreateDocenteTutor' }, id_usuario),
      );
      return SuccessResponse(Usuario);
    } catch (error) {
      return FailResponse(error);
    }
  }

  @ApiTags('DocenteTutor')
  @Get()
  async GetAll(@Query() Pagination: PaginationDto) {
    try {
      const Data = await firstValueFrom(
        this.client.send({ cmd: 'GetAllDocenteTutor' }, Pagination),
      );
    } catch (e) {
      return FailResponse(e);
    }
  }

  @ApiTags('DocenteTutor')
  @Get(':id')
  async Get(@Param('id') id: number) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'GetDocenteTutor' }, id),
      );
      return SuccessResponse(data);
    } catch (e) {
      return FailResponse(e);
    }
  }
  @ApiTags('DocenteTutor')
  @Put(':id')
  async Update(
    @Param('id') id: number,
    @Body() DocenteTutorData: docenteTutorUpdateDTO,
  ) {
    try {
      const data = await firstValueFrom(
        this.client.send(
          { cmd: 'UpdateDocenteTutor' },
          { id, DocenteTutorData },
        ),
      );
      if (!data) {
        return BadRequestResponse('Data no encontrada');
      }
      return SuccessResponse(data);
    } catch (e) {
      return FailResponse(e);
    }
  }

  @ApiTags('DocenteTutor')
  @Delete(':id')
  async Delete(@Param('id') id: number) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'DeleteDocenteTutor' }, id),
      );
      return SuccessResponse(data);
    } catch (e) {
      return FailResponse(e);
    }
  }

  @ApiTags('DocenteTutor')
  @Put(':id/restore')
  async Restore(@Param('id') id: number) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'RestoreDocenteTutor' }, id),
      );
      return SuccessResponse(data);
    } catch (error) {
      return FailResponse(error);
    }
  }
}
