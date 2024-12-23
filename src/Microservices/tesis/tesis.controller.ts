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
import {
  FailResponse,
  PaginatedMappedResponse,
  PaginatedSuccessResponse,
  SuccessResponse,
} from 'src/Response/Responses';
import { tesisDTO } from '../DTO/tesis.DTO';
import { PaginationDto } from 'src/Pagination/PaginationDTO';
import { noConectionValidator } from 'src/ExceptionValidator/ExceptionValidator';
import { ResponseAPIDTO } from '../DTO/ResponseDTO';

@Controller('tesis')
export class TesisController {
  constructor(@Inject('NAT_Service') private readonly client: ClientProxy) {}

  @ApiTags('Tesis')
  @Post()
  async Create(@Body() Tesis: tesisDTO) {
    try {
      const IdDocente = Tesis.id_docente_tutor;
      const Exist = await firstValueFrom(
        this.client.send({ cmd: 'GetDocenteTutor' }, IdDocente),
      );
      if (!Exist) {
        return FailResponse('Docente Tutor no valido');
      }
      const Data = await firstValueFrom(
        this.client.send({ cmd: 'CreateTesis' }, Tesis),
      );
      return SuccessResponse(Data);
    } catch (e) {
      if (!noConectionValidator(e)) {
        return FailResponse(e);
      }
      return FailResponse(
        'Existen problemas con los demas servicios servicios',
      );
    }
  }

  @ApiTags('Tesis')
  @Get()
  async GetAll(@Query() Pagination: PaginationDto) {
    try {
      const Tesis:ResponseAPIDTO = await firstValueFrom(
        this.client.send({ cmd: 'GetAllTesis' }, Pagination),
      );
      const{Data,meta} = Tesis
      const Docente =await Promise.all( Data.map(async (Tesis) => {
        const Docente = await firstValueFrom(
          this.client.send({ cmd: 'GetDocenteTutor' }, Tesis.id_docente_tutor),
        );
        return Docente.id_usuario;
      }));
      const UsuariosName =await Promise.all( Docente.map(async (docentes) => {
        const DocenteData = await firstValueFrom(
          this.client.send({ cmd: 'GetUsuarioNames' }, docentes),
        )
        return DocenteData 
      }))

      const MappedData = Data.map((Tesis,index)=>{
        return {
          ...Tesis,
          docente_tutor: `${UsuariosName[index].nombres}` + ' ' + `${UsuariosName[index].apellidos}`
        }
      })
      const Response = {Data:MappedData,meta}
      return PaginatedSuccessResponse(Response);
    } catch (e) {
      console.log(e)
      return FailResponse(e);
    }
  }

  @ApiTags('Tesis')
  @Get('Like/:search')
  async GetAllLike(
    @Query() Pagination: PaginationDto,
    @Param('search') Like: string,
  ) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'GetAllLikeTesis' }, { Pagination, Like }),
      );
      return PaginatedSuccessResponse(data);
    } catch (e) {
      return FailResponse(e);
    }
  }

  @ApiTags('Tesis')
  @Get(':id')
  async Get(@Param('id') id: number) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'GetTesis' }, id),
      );
      return SuccessResponse(data);
    } catch (e) {
      return FailResponse(e);
    }
  }

  @ApiTags('Tesis')
  @Put(':id')
  async Update(@Param('id') id: number, @Body() TesisData: tesisDTO) {
    try {
      const IdDocente = TesisData.id_docente_tutor;

      //Llamado a servicio
      const Exist = await firstValueFrom(
        this.client.send({ cmd: 'GetDocenteTutor' }, IdDocente),
      );

      //Validacion
      if (!Exist) {
        return FailResponse('Docente Tutor no valido');
      }

      //Llamado a servicio
      const data = await firstValueFrom(
        this.client.send({ cmd: 'UpdateTesis' }, { id, TesisData }),
      );


      //Respuesta
      return SuccessResponse(data);
    } catch (e) {
      if(!noConectionValidator(e)){
        return FailResponse(e);
      }
      return FailResponse('Existen problemas con los demas servicios servicios')
    }
  }

  @ApiTags('Tesis')
  @Delete(':id')
  async Delete(@Param('id') id: number) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'DeleteTesis' }, id),
      );
      return SuccessResponse(data);
    } catch (e) {
      return FailResponse(e);
    }
  }

  @ApiTags('Tesis')
  @Put(':id/restore')
  async Restore(@Param('id') id: number) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'RestoreTesis' }, id),
      );
    } catch (error) {
      return FailResponse(error);
    }
  }
}
