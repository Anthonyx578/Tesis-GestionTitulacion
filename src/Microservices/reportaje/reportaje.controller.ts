import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { first, firstValueFrom, map } from 'rxjs';
import { ExeptValidator } from 'src/ExceptionValidator/ExceptionValidator';
import { FailResponse } from 'src/Response/Responses';

@Controller('reportaje')
export class ReportajeController {
  constructor(@Inject('NAT_Service') private readonly client: ClientProxy) {}

  @ApiTags('Reportaje')
  @Get()
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
          console.log(nombres);
          const Carrera = await firstValueFrom(
            this.client.send({ cmd: 'GetCarrera' }, nombres.id_carrera),
          );
          console.log(Carrera);
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
          console.log(idrequisitos);
          const Requisito = await Promise.all(
            idrequisitos.map(async (ids) => {
              const Requisitos = await firstValueFrom(
                this.client.send({ cmd: 'GetRequisito' }, ids.id_requisito),
              );
              return { Requisito: Requisitos.documento };
            }),
          );
          return Requisito;
        }),
      );

      const RequisitosCombinados = IdRequisitos.map((requisitos, index) => {
        const requisitosNombre = RequisitosNombre[index] || [];
        const combinados = requisitosNombre.map((req) => {
          const estado =
            requisitos.find((r) => r.id_requisito === req.id_requisito)
              ?.estado || 0;
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
}
