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
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { requisitoCumplidoDTO } from '../DTO/requisito-cumplido.DTO';
import { first, firstValueFrom } from 'rxjs';
import {
  BadRequestResponse,
  FailResponse,
  FailServiceResponse,
  PaginatedMappedResponse,
  PaginatedSuccessResponse,
  SuccessResponse,
} from 'src/Response/Responses';
import { PaginationDto } from 'src/Pagination/PaginationDTO';
import { ExeptValidator } from 'src/ExceptionValidator/ExceptionValidator';
import { requisitoDTO } from '../DTO/requisito.DTO';

@Controller('requisito-cumplido')
export class RequisitoCumplidoController {
  constructor(@Inject('NAT_Service') private readonly client: ClientProxy) {}
  @ApiTags('Requisito Cumplido')
  @Post()
  async Create(@Body() RequisitoCumplido: requisitoCumplidoDTO) {
    try {
      if(RequisitoCumplido.id_estudiante){
        const Exist = await firstValueFrom(
          this.client.send({cmd:'GetEstudiante'},RequisitoCumplido.id_estudiante)
        )
        if(!Exist){
          return BadRequestResponse('El Estudiante no es valido')
        }
      }
      const Data = await firstValueFrom(
        this.client.send({ cmd: 'CreateRequisitoCumplido' }, RequisitoCumplido),
      );
      return SuccessResponse(Data);
    } catch (e) {
      return FailServiceResponse(ExeptValidator(e));
    }
  }

  @ApiTags('Requisito Cumplido')
  @Get()
  async GetAll(@Query() Pagination: PaginationDto) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'GetAllRequisitoCumplido' }, Pagination),
      );
      return PaginatedSuccessResponse(data);
    } catch (e) {
      return FailResponse(e);
    }
  }


  @ApiTags('Requisito Cumplido')
  @Get('ByEstudiante/:id_estudiante')
  async GetAllByEstudiante(
    @Query() Pagination: PaginationDto,
    @Param('id_estudiante') id_estudiante: number,
  ) {
    try {

      const ReqData: { Data: []; meta: {} } = await firstValueFrom(
        this.client.send(
          { cmd: 'GetAllByEstudianteRequisitoCumplido' },
          { Pagination, id_estudiante },
        ),
      );
      return PaginatedSuccessResponse(ReqData);
    } catch (e) {
        return FailResponse(ExeptValidator(e));
    }
  }

  @ApiTags('Requisito Cumplido')
  @Get(':id')
  async Get(@Param('id') id: number) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'GetRequisitoCumplido' }, id),
      );
      return SuccessResponse(data);
    } catch (e) {
      return FailResponse(e);
    }
  }

  @ApiTags('Requisito Cumplido')
  @Put(':id')
  async Update(
    @Param('id') id: number,
    @Body() RequisitoCumplidoData: requisitoCumplidoDTO,
  ) {
    try {
      if(RequisitoCumplidoData.id_estudiante){
        const Exist = await firstValueFrom(
          this.client.send({cmd:'GetEstudiante'},RequisitoCumplidoData.id_estudiante)
        )
        if(!Exist){
          return BadRequestResponse('El Estudiante no es valido')
        }
      }
      const data = await firstValueFrom(
        this.client.send(
          { cmd: 'UpdateRequisitoCumplido' },
          { id, RequisitoCumplidoData },
        ),
      );
      return SuccessResponse(data);
    } catch (e) {
      return FailResponse(ExeptValidator(e));
    }
  }

  @ApiTags('Requisito Cumplido')
  @Delete(':id')
  async Delete(@Param('id') id: number) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'DeleteRequisitoCumplido' }, id),
      );
      return SuccessResponse(data);
    } catch (e) {
      return FailResponse(e);
    }
  }

  @ApiTags('Requisito Cumplido')
  @Put(':id/restore')
  async Restore(@Param('id') id: number) {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: 'RestoreRequisitoCumplido' }, id),
      );
    } catch (error) {
      return FailResponse(error);
    }
  }
}
