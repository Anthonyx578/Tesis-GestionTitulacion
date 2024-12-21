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
import { Usuario } from '../DTO/usuario.Entity';

@Controller('usuario')
export class UsuarioController {
  constructor(@Inject('NAT_Service') private readonly client: ClientProxy) {}

  @ApiTags('Usuario')
  @Post()
  async Create(@Body() Usuario: UsuarioUpdateDTO) {
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
  @Get('/like')
  @ApiQuery({name:'Like',required:false})
  async GetAllLike(@Query() Pagination: PaginationDto,@Query() Like: string) {
    try {
      Like = Like||'';
      const data = await firstValueFrom(
        this.client.send({ cmd: 'GetAllUsuarioLike' }, {Pagination,Like}),
      );
      return PaginatedSuccessResponse(data);
    } catch (e) {
      return FailResponse(e);
    }
  }

  @ApiTags('Usuario')
  @Get('/profesores')
  @ApiQuery({
    name: 'like',
    required: false,
    description: 'Filtro de busqueda opcional',
  })
  async GetAllProfesores(
    @Query() Pagination: PaginationDto,
    @Query('like') Like?: string,
  ) {
    try {
      const searchLike = Like || '';
      const idRol = await firstValueFrom(
        this.client.send({ cmd: 'GetByRol' }, 'profesor'),
      );
      const Profesores: { Data: Usuario[]; meta: {} } = await firstValueFrom(
        this.client.send(
          { cmd: 'GetAllUsuarioByRol' },
          { Pagination, ...idRol, searchLike },
        ),
      );
      const { Data, meta } = Profesores;
      const ProfesorMapped = await Promise.all(
        Data.map(async (profesores) => {
          const Istutor: { id_docente_tutor; id_usuario; status: number } =
            await firstValueFrom(
              this.client.send(
                { cmd: 'GetDocenteTutorByUser' },
                profesores.id_usuario,
              ),
            );
          const IsJurado: { id_jurado; id_usuario; status } =
            await firstValueFrom(
              this.client.send(
                { cmd: 'GetJuradoByUser' },
                profesores.id_usuario,
              ),
            );
          var ProfesorTutorMP: {};
          var ProfesorJuradoMp:{};
          if (Istutor != null) {
            if (Istutor.status == 0) {
              ProfesorTutorMP = {
                ...profesores,
                id_docente_tutor: Istutor.id_docente_tutor,
                statusTutor: Istutor.status,
                isTutor: 0,
              };
            } else {
              ProfesorTutorMP = {
                ...profesores,
                id_docente_tutor: Istutor.id_docente_tutor,
                statusTutor: Istutor.status,
                isTutor: 1,
              };
            }
          }
          if (ProfesorTutorMP) {
            
            if (IsJurado != null) {
              ProfesorJuradoMp = {
                ...ProfesorTutorMP,
                id_jurado: IsJurado.id_jurado,
                statusJurado: IsJurado.status,
              };
              if (IsJurado.status == 0) {
                ProfesorJuradoMp = { ...ProfesorJuradoMp, isJurado: 0 };
              } else {
                ProfesorJuradoMp = { ...ProfesorJuradoMp, isJurado: 1 };
              }
            }

          }
          if(ProfesorJuradoMp){
            console.log(ProfesorJuradoMp)
            return ProfesorJuradoMp
          }
        }),
      );
      //console.log(ProfesorMapped);
      const Response={
        Data:ProfesorMapped,
        meta
      }
      return PaginatedSuccessResponse(Response);
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
