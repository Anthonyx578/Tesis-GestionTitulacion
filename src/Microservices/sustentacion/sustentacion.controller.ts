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
import {
  ApiRequestedRangeNotSatisfiableResponse,
  ApiTags,
} from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/Pagination/PaginationDTO';
import {
  BadRequestResponse,
  FailResponse,
  PaginatedMappedResponse,
  PaginatedSuccessResponse,
  SuccessResponse,
} from 'src/Response/Responses';
import { sustentacionDTO } from './DTO/sustentacion.DTO';
import { ExeptValidator } from 'src/ExceptionValidator/ExceptionValidator';
import { ResponseAPIDTO } from '../DTO/ResponseDTO';

@Controller('sustentacion')
export class SustentacionController {
  constructor(@Inject('NAT_Service') private readonly client: ClientProxy) {}

  @ApiTags('Sustentacion')
  @Post()
  async Create(@Body() sustentacion: sustentacionDTO) {
    try {
      //Validamos su existencia
      if (sustentacion.id_carrera || sustentacion.id_carrera == 0) {
        const ExistCarrera = await firstValueFrom(
          this.client.send({ cmd: 'GetCarrera' }, sustentacion.id_carrera),
        );
        if (!ExistCarrera) {
          return BadRequestResponse('Carrera no valida');
        }
      }
      if (sustentacion.id_tesis || sustentacion.id_carrera == 0) {
        const ExistTesis = await firstValueFrom(
          this.client.send({ cmd: 'GetTesis' }, sustentacion.id_tesis),
        );
        if (!ExistTesis) {
          return BadRequestResponse('Tesis no valida');
        }
      }
      const Sustentacion = await firstValueFrom(
        this.client.send({ cmd: 'CreateSustentacion' }, sustentacion),
      );
      return SuccessResponse(Sustentacion);
    } catch (e) {
      return FailResponse(ExeptValidator(e));
    }
  }

  @ApiTags('Sustentacion')
  @Get()
  async GetAll(@Query() Pagination: PaginationDto) {
    try {
      const Data = await firstValueFrom(
        this.client.send({ cmd: 'GetAllSustentacion' }, Pagination),
      );
      return PaginatedSuccessResponse(Data);
    } catch (e) {
      return FailResponse(e);
    }
  }

  @ApiTags('Sustentacion')
  @Get('Jurado')
  async GetAllJurado(
    @Query() Pagination: PaginationDto,
    @Query('idJurado') id_jurado: number,
  ) {
    try {
      const { Data, meta, message }: ResponseAPIDTO = await firstValueFrom(
        this.client.send(
          { cmd: 'GetAllJuradoSustentacionJurado' },
          { Pagination, id_jurado },
        ),
      );
      const Sustentaicones: any[] = await Promise.all(
        Data.map(async (Sustentaciones) => {
          const DataSustentaciones = await firstValueFrom(
            this.client.send(
              { cmd: 'GetSustentacion' },
              Sustentaciones.id_sustentacion,
            ),
          );
          return DataSustentaciones;
        }),
      );
      const carreras = await this.MappearCarrera(Sustentaicones)
      const tesis = await this.MappearTesis(Sustentaicones)
      const SustentacionMapeada = Sustentaicones.map((sustentacion, index) => {
        return {
          ...sustentacion,
          carrera: carreras[index].nombre_carrera,
          tesis: tesis[index].titulo,
        };
      });

      const response = { Data: SustentacionMapeada, meta };
      return PaginatedMappedResponse(SustentacionMapeada);
    } catch (e) {
      return FailResponse(ExeptValidator(e));
    }
  }

  @ApiTags('Sustentacion')
  @Get(':id')
  async Get(@Param('id') id: number) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'GetSustentacion' }, id),
      );
      return SuccessResponse(data);
    } catch (e) {
      return FailResponse(e);
    }
  }

  @ApiTags('Sustentacion')
    @Get('Tesis')
    async GetSustentaicon(@Query('id_tesis') id_tesis: number) {
      console.log('Entre al servicio')
      const data = await firstValueFrom(
        this.client.send({ cmd: 'GetSustentacionTesis' }, id_tesis),
      );
      return data;
    }

  @ApiTags('Sustentacion')
  @Put(':id')
  async Update(
    @Param('id') id: number,
    @Body() SustentacionData: sustentacionDTO,
  ) {
    try {
      const data = await firstValueFrom(
        this.client.send(
          { cmd: 'UpdateSustentacion' },
          { id, SustentacionData },
        ),
      );
      return SuccessResponse(data);
    } catch (e) {
      return FailResponse(e);
    }
  }

  @ApiTags('Sustentacion')
  @Delete(':id')
  async Delete(@Param('id') id: number) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'DeleteSustentacion' }, id),
      );
      return SuccessResponse(data);
    } catch (e) {
      return FailResponse(e);
    }
  }

  @ApiTags('Sustentacion')
  @Put(':id/restore')
  async Restore(@Param('id') id: number) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'RestoreSustentacion' }, id),
      );
      return SuccessResponse(data);
    } catch (error) {
      return FailResponse(error);
    }
  }

  async MappearCarrera(Sustentaciones: any[]) {
    const Carrera = await Promise.all(
      Sustentaciones.map(async (sustentacion) => {
        const carreras = await firstValueFrom(
          this.client.send({ cmd: 'GetCarrera' }, sustentacion.id_carrera),
        );
        return carreras;
      }),
    );
    return Carrera
  }

  async MappearTesis(Sustentaciones:any[]){
    const Tesis = await Promise.all(
      Sustentaciones.map(async (sustentacion) => {
        const tesis =await firstValueFrom(
          this.client.send({ cmd: 'GetTesis' }, sustentacion.id_tesis),
        );
        return tesis;
      }),
    );
    return Tesis
  }
}
