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
import { firstValueFrom } from 'rxjs';
import { ExeptValidator } from 'src/ExceptionValidator/ExceptionValidator';
import { PaginationDto } from 'src/Pagination/PaginationDTO';
import {
  BadRequestResponse,
  FailResponse,
  PaginatedSuccessResponse,
  SuccessResponse,
} from 'src/Response/Responses';
import { juradoSustentacionDTO } from '../DTO/jurado-sustentacion.DTO';
import { SustentacionComentarioDTO } from './Dto/ComentarioSustentacionDTO';

@Controller('jurado-sustentacion')
export class JuradoSustentacionController {
  constructor(@Inject('NAT_Service') private readonly client: ClientProxy) {}

  @ApiTags('Jurado Sustentacion')
  @Post()
  async Create(@Body() JuradoSustentacion: juradoSustentacionDTO) {
    try {
      //Validamos su existencia

      if (JuradoSustentacion.id_jurado) {
        const ExistJurado = await firstValueFrom(
          this.client.send({ cmd: 'GetJurado' }, JuradoSustentacion.id_jurado),
        );

        if (!ExistJurado) {
          return BadRequestResponse('El Jurado  no es valido');
        }
      }

      if (JuradoSustentacion.id_sustentacion) {
        const Existsustentacion = await firstValueFrom(
          this.client.send(
            { cmd: 'GetSustentacion' },
            JuradoSustentacion.id_sustentacion,
          ),
        );

        if (!Existsustentacion) {
          return BadRequestResponse('La Sustentacion no es valida');
        }
      }

      const JuradoSus = await firstValueFrom(
        this.client.send(
          { cmd: 'CreateJuradoSustentacion' },
          JuradoSustentacion,
        ),
      );
      return SuccessResponse(JuradoSus);
    } catch (e) {
      console.log(e);
      return FailResponse(ExeptValidator(e));
    }
  }

  @ApiTags('Jurado Sustentacion')
  @Get('verjurados/buscar')
  async GetAllVerJUrados(@Query('idSustentacion') id_sustentaicon: number) {
    try {
      console.log(id_sustentaicon);
      const Jurados: any[] = await firstValueFrom(
        this.client.send({ cmd: 'GetSustentacionVerJurados' }, id_sustentaicon),
      );
      const IdUsuarios = await Promise.all(
        Jurados.map(async (jurados) => {
          const IdUsuarios = await firstValueFrom(
            this.client.send({ cmd: 'GetJurado' }, jurados.id_jurado),
          );
          return IdUsuarios.id_usuario;
        }),
      );
      const nombres = await Promise.all(
        IdUsuarios.map(async (ids) => {
          const Nombres = await firstValueFrom(
            this.client.send({ cmd: 'GetUsuarioNames' }, ids),
          );
          return Nombres;
        }),
      );
      console.log(Jurados);
      console.log(IdUsuarios);
      console.log(nombres);
      const Response = await Jurados.map((jurados, index) => {
        return { ...jurados, ...nombres[index] };
      });
      return SuccessResponse(Response);
    } catch (e) {
      console.log(e);
      return FailResponse(e);
    }
  }

  @ApiTags('Jurado Sustentacion')
  @Get('sustentacion/comentarios')
  async GetSustentacionComentarios(
    @Query('idSutentacion') idSustentacion: number,
  ) {
    try {
      const SustentacionComentarios: SustentacionComentarioDTO[] =
        await firstValueFrom(
          this.client.send({ cmd: 'GetAllComentarios' }, idSustentacion),
        );
      const IdsUsuarios = await Promise.all(
        SustentacionComentarios.map(async (comentarios) => {
          const Jurados: { id_usuario: number; id_jurado: number } =
            await firstValueFrom(
              this.client.send({ cmd: 'GetJurado' }, comentarios.id_jurado),
            );
          return Jurados.id_usuario;
        }),
      );
      const NombresJurados = await Promise.all(
        IdsUsuarios.map(async (ids) => {
          const Nombres:{id_carrera:number,nombres:string,apellidos:string} = await firstValueFrom(
            this.client.send({ cmd: 'GetUsuarioNames' }, ids),
          );
          return {Nombres:`${Nombres.nombres} ${Nombres.apellidos}`}
        }),
      );
      const Respuesta = SustentacionComentarios.map(
        (comentarios,index)=>{
          return {...comentarios,nombres:NombresJurados[index].Nombres}
        }
      )
      return SuccessResponse(Respuesta);
    } catch (error) {
      return FailResponse(ExeptValidator(error));
    }
  }

  @ApiTags('Jurado Sustentacion')
  @Get(':id')
  async Get(@Param('id') id: number) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'GetEstudiante' }, id),
      );
      const { id_usuario } = data;
      const userData = await firstValueFrom(
        this.client.send({ cmd: 'GetUsuario' }, id_usuario),
      );
      console.log(userData);
      const MapedData = { ...userData, ...data };
      return SuccessResponse(MapedData);
    } catch (e) {
      return FailResponse(ExeptValidator(e));
    }
  }

  @ApiTags('Jurado Sustentacion')
  @Get()
  async GetAll(@Query() Pagination: PaginationDto) {
    try {
      const Data = await firstValueFrom(
        this.client.send({ cmd: 'GetAllJuradoSustentacion' }, Pagination),
      );
      //console.log(CompleteData)
      return PaginatedSuccessResponse(Data);
    } catch (e) {
      return FailResponse(ExeptValidator(e));
    }
  }

  @ApiTags('Jurado Sustentacion')
  @Put(':id')
  async Update(
    @Param('id') id: number,
    @Body() JuradoSustentacion: juradoSustentacionDTO,
  ) {
    try {
      //Validacion
      if (JuradoSustentacion.id_jurado) {
        const ExistJurado = await firstValueFrom(
          this.client.send({ cmd: 'GetJurado' }, JuradoSustentacion.id_jurado),
        );

        if (!ExistJurado) {
          return BadRequestResponse('El Jurado  no es valido');
        }
      }

      if (JuradoSustentacion.id_sustentacion) {
        const Existsustentacion = await firstValueFrom(
          this.client.send(
            { cmd: 'GetSustentacion' },
            JuradoSustentacion.id_sustentacion,
          ),
        );

        if (!Existsustentacion) {
          return BadRequestResponse('La Sustentacion no es valida');
        }
      }
      const data = await firstValueFrom(
        this.client.send(
          { cmd: 'UpdateEstudiante' },
          { id, JuradoSustentacion },
        ),
      );
      return SuccessResponse(data);
    } catch (e) {
      return FailResponse(ExeptValidator(e));
    }
  }

  @ApiTags('Jurado Sustentacion')
  @Delete(':id')
  async Delete(@Param('id') id: number) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'DeleteJuradoSustentacion' }, id),
      );
      return SuccessResponse(data);
    } catch (e) {
      return FailResponse(e);
    }
  }

  @ApiTags('Jurado Sustentacion')
  @Put(':id/restore')
  async Restore(@Param('id') id: number) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'RestoreEstudiante' }, id),
      );
      return SuccessResponse(data);
    } catch (error) {
      return FailResponse(error);
    }
  }
}
