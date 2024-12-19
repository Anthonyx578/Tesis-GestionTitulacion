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
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { UsuarioCreateDTO } from '../DTO/usuario.Create.DTO';
import {
  FailResponse,
  PaginatedMappedResponse,
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
  async Create(@Body() Usuario: UsuarioUpdateDTO) {
    try {
      const Data = await firstValueFrom(
        this.client.send({ cmd: 'CreateUsuario'}, Usuario),
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
  @Get()
  async GetAllLike(@Query() Pagination: PaginationDto,Like:string) {
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
  @Get('/profesores')
  @ApiQuery({name:'like',required:false,description:'Filtro de busqueda opcional'})
  async GetAllProfesores(@Query() Pagination: PaginationDto,@Query('like')Like?: string) {
    try {
      const searchLike = Like || '';
      const idRol = await firstValueFrom(
        this.client.send({ cmd:'GetByRol'}, 'profesor'),
      );
      const Profesores = await firstValueFrom(
        this.client.send({cmd:'GetAllUsuarioByRol'},{Pagination,...idRol,searchLike})
      )
      return PaginatedSuccessResponse(Profesores);
    } catch (e) {
      return FailResponse(e.message);
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
