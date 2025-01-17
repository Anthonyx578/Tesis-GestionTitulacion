import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { first, firstValueFrom, map } from 'rxjs';
import { ExeptValidator } from 'src/ExceptionValidator/ExceptionValidator';
import { FailResponse } from 'src/Response/Responses';
import { tesisDTO } from '../DTO/tesis.DTO';
import { RequisitoController } from '../requisito/requisito.controller';

@Controller('reportaje')
export class ReportajeController {
  constructor(@Inject('NAT_Service') private readonly client: ClientProxy) {}

  @ApiTags('Reportaje')
  @Get('RequisitosEstudiantes')
  async RequisitosCumplidos() {
    try {
      const EstudiantesIDs: any[] = await firstValueFrom(
        this.client.send({ cmd: 'GetAllEstudianteIDs' }, {}),
      );

      const NombresEstudiantes: any[] = await Promise.all(
        EstudiantesIDs.map(async (estudiantesIDs) => {
          const nombres: {
            apellidos: string;
            nombres: string;
            id_carrera: number;
          } = await firstValueFrom(
            this.client.send(
              { cmd: 'GetUsuarioNames' },
              estudiantesIDs.id_usuario,
            ),
          );
          const Carrera = await firstValueFrom(
            this.client.send({ cmd: 'GetCarrera' }, nombres.id_carrera),
          );
          return {
            nombres: `${nombres.apellidos} ${nombres.apellidos}`,
            Carrera: Carrera.nombre_carrera,
          };
        }),
      );

      const IdRequisitos: any[] = await Promise.all(
        EstudiantesIDs.map(async (estudiantesIDS) => {
          const requisitos = await firstValueFrom(
            this.client.send(
              { cmd: 'GetRequisitoCumplidoEstudiante' },
              estudiantesIDS.id_estudiante,
            ),
          );
          return requisitos;
        }),
      );

      const RequisitosCumplidos = await Promise.all(
        EstudiantesIDs.map(async (estudiantes) => {
          const RequisitosCumplidos = await firstValueFrom(
            this.client.send({ cmd: 'ContarRequisito' }, estudiantes.id_estudiante),
          );
          return RequisitosCumplidos
        }),
      );
      const RequisitosNombre = await Promise.all(
        IdRequisitos.map(async (idrequisitos) => {
          const Requisito = await Promise.all(
            idrequisitos.map(async (ids) => {
              const Requisitos = await firstValueFrom(
                this.client.send({ cmd: 'GetRequisito' }, ids.id_requisito),
              );
              return { Requisito: Requisitos.documento, id_requisito:Requisitos.id_requisito};
            }),
          );
          return Requisito;
        }),
      );
      const RequisitosCombinados = IdRequisitos.map((requisitos, index) => {
        const requisitosNombre = RequisitosNombre[index] || [];
        const combinados = requisitosNombre.map((req) => {
      
          const match = requisitos.find((r) => r.id_requisito === req.id_requisito);
      
          const estado = match?.estado || 0; // Usar nullish coalescing
          return { ...req, estado };
        });
        return combinados;
      });

      const Mapeo: any[] = NombresEstudiantes.map((nombre, index) => {
        return {
          Nombres: nombre.nombres,
          Carrera: nombre.Carrera,
          RequistosCumplidos:RequisitosCumplidos[index],
          Requisitos: RequisitosCombinados[index],
        };
      });

      return Mapeo;
    } catch (error) {
      return FailResponse(error);
    }
  }



  @ApiTags('Reportaje')
  @Get('TesisTutor')
  async TesisTutor(@Query('id_tutor')Id_tutor:number) {
    try {
        
    } catch (error) {
      
    }
  }


  @ApiTags('Reportaje')
  @Get('TesisPerido')
  async TesisPeriodo(@Query('id_tutor')Periodo:number) {
    try {
      const Tesis = this.GetTesisByPeriodo(Periodo);
      return Tesis
    } catch (error) {
      
    }
  }


  async GetTesisByPeriodo(Periodo:number):Promise<tesisDTO[]>{
    const Tesis =await firstValueFrom(
      this.client.send({cmd:'GetAllTesisByPeriod'},Periodo)
    )
    return Tesis
  }
}
