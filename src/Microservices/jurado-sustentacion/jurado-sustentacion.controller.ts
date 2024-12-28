import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { ExeptValidator } from 'src/ExceptionValidator/ExceptionValidator';
import { PaginationDto } from 'src/Pagination/PaginationDTO';
import { BadRequestResponse, FailResponse, PaginatedSuccessResponse, SuccessResponse } from 'src/Response/Responses';
import { juradoSustentacionDTO } from '../DTO/jurado-sustentacion.DTO';

@Controller('jurado-sustentacion')
export class JuradoSustentacionController {
    constructor(@Inject('NAT_Service') private readonly client: ClientProxy) {}
    
      @ApiTags('Jurado Sustentacion')
      @Post()
      async Create(@Body() JuradoSustentacion: juradoSustentacionDTO) {
        try {
          //Validamos su existencia

          if(JuradoSustentacion.id_jurado){
            const ExistJurado = await firstValueFrom(
              this.client.send({ cmd: 'GetJurado' }, JuradoSustentacion.id_jurado),
            );

            if (!ExistJurado ) {
              return BadRequestResponse(
                'El Jurado  no es valido',
              );
            }
          }
          
          if(JuradoSustentacion.id_sustentacion){
            const Existsustentacion = await firstValueFrom(
              this.client.send({ cmd: 'GetSustentacion' }, JuradoSustentacion.id_sustentacion),
            );
            
            if (!Existsustentacion) {
              return BadRequestResponse(
                'La Sustentacion no es valida',
              );
            }
          }
          
          const JuradoSus = await firstValueFrom(
            this.client.send({ cmd: 'CreateJuradoSustentacion' }, JuradoSustentacion),
          );
          return SuccessResponse(JuradoSus);
        } catch (e) {
            console.log(e)
            return FailResponse(ExeptValidator(e));
        }
      }
    
      @ApiTags('Jurado Sustentacion')
      @Get()
      async GetAll(@Query() Pagination: PaginationDto) {
        /*try {
          const Data = await firstValueFrom(
            this.client.send<{ data: estudiante[]; meta: any }>(
              { cmd: 'GetAllEstudiante' },
              Pagination,
            ),
          );
          //Obtenemos el apartado de data de la respuesta
          const { data } = Data;
          //Completamos los datos con los de usuario
          const CompleteData = await Promise.all(
            data.map(async (estudiante) => {
              const UserData = await firstValueFrom(
                this.client.send({ cmd: 'GetUsuario' }, estudiante.id_usuario),
              );
              return { ...UserData, ...estudiante };
            }),
          );
          //console.log(CompleteData)
          return PaginatedSuccessResponse({ data: CompleteData, meta: Data.meta });
        } catch (e) {
          if(!noConectionValidator(e)){
            return FailResponse(e);
          }
          return FailResponse('Existen problemas con los demas servicios servicios')
        }*/
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
      @Put(':id')
      async Update(
        @Param('id') id: number,
        @Body() JuradoSustentacion: juradoSustentacionDTO,
      ){
        try {
          //Validacion
          if(JuradoSustentacion.id_jurado){
            const ExistJurado = await firstValueFrom(
              this.client.send({ cmd: 'GetJurado' }, JuradoSustentacion.id_jurado),
            );

            if (!ExistJurado ) {
              return BadRequestResponse(
                'El Jurado  no es valido',
              );
            }
          }
          
          if(JuradoSustentacion.id_sustentacion){
            const Existsustentacion = await firstValueFrom(
              this.client.send({ cmd: 'GetSustentacion' }, JuradoSustentacion.id_sustentacion),
            );
            
            if (!Existsustentacion) {
              return BadRequestResponse(
                'La Sustentacion no es valida',
              );
            }
          }
          const data = await firstValueFrom(
            this.client.send({ cmd: 'UpdateEstudiante' }, { id, JuradoSustentacion }),
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
            this.client.send({ cmd: 'DeleteEstudiante' }, id),
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
