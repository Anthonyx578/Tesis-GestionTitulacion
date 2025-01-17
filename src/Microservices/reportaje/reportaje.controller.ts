import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { first, firstValueFrom, map } from 'rxjs';
import { ExeptValidator } from 'src/ExceptionValidator/ExceptionValidator';
import { FailResponse, PaginatedSuccessResponse } from 'src/Response/Responses';
import { tesisDTO } from '../DTO/tesis.DTO';
import { RequisitoController } from '../requisito/requisito.controller';
import { Usuario } from '../DTO/usuario.Entity';

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
            this.client.send(
              { cmd: 'ContarRequisito' },
              estudiantes.id_estudiante,
            ),
          );
          return RequisitosCumplidos;
        }),
      );
      const RequisitosNombre = await Promise.all(
        IdRequisitos.map(async (idrequisitos) => {
          const Requisito = await Promise.all(
            idrequisitos.map(async (ids) => {
              const Requisitos = await firstValueFrom(
                this.client.send({ cmd: 'GetRequisito' }, ids.id_requisito),
              );
              return {
                Requisito: Requisitos.documento,
                id_requisito: Requisitos.id_requisito,
              };
            }),
          );
          return Requisito;
        }),
      );
      const RequisitosCombinados = IdRequisitos.map((requisitos, index) => {
        const requisitosNombre = RequisitosNombre[index] || [];
        const combinados = requisitosNombre.map((req) => {
          const match = requisitos.find(
            (r) => r.id_requisito === req.id_requisito,
          );

          const estado = match?.estado || 0; // Usar nullish coalescing
          return { ...req, estado };
        });
        return combinados;
      });

      const Mapeo: any[] = NombresEstudiantes.map((nombre, index) => {
        return {
          Nombres: nombre.nombres,
          Carrera: nombre.Carrera,
          RequistosCumplidos: RequisitosCumplidos[index],
          Requisitos: RequisitosCombinados[index],
        };
      });

      return Mapeo;
    } catch (error) {
      return FailResponse(error);
    }
  }



  @ApiTags('Reportaje')
  @Get('TesisPerido')
  async TesisPeriodo(@Query('Periodo') Periodo: string) {
    try {
      const Tesis: tesisDTO[] = await this.GetTesisByPeriodo(Periodo);
      console.log(Tesis);

      const IDdocenteTutor = await Promise.all(
        Tesis.map(async (tesis) => {
          const docenteData = await firstValueFrom(
            this.client.send(
              { cmd: 'GetDocenteTutor' },
              tesis.id_docente_tutor,
            ),
          );
          console.log(docenteData);
          return { IdUsuario: docenteData.id_usuario };
        }),
      );
      const UsuariosName = await Promise.all(
        IDdocenteTutor.map(async (idDocenteTutor) => {
          const usuarios = await firstValueFrom(
            this.client.send(
              { cmd: 'GetUsuarioNames' },
              idDocenteTutor.IdUsuario,
            ),
          );
          return { Nombres: `${usuarios.nombres} ${usuarios.apellidos}` };
        }),
      );
      const MapeoFinal = Tesis.map((tesis, index) => {
        return { ...tesis, ...UsuariosName[index] };
      });
      return MapeoFinal;
    } catch (error) {
      return FailResponse(ExeptValidator(error));
    }
  }

  async GetTesisByPeriodo(Periodo: string): Promise<tesisDTO[]> {
    const Tesis: tesisDTO[] = await firstValueFrom(
      this.client.send({ cmd: 'GetAllTesisByPeriod' }, Periodo),
    );
    return Tesis;
  }

  @ApiTags('Reportaje')
  @Get('UsuariosProfesores')
  async GetAllProfesores() {
    try {
      const idRol = await firstValueFrom(
        this.client.send({ cmd: 'GetByRol' }, 'profesor'),
      );
      const Profesores: { Data: Usuario[]; meta: {} } = await firstValueFrom(
        this.client.send({ cmd: 'GetAllUsuarioByRolReporte' }, { ...idRol }),
      );


      const { Data } = Profesores;
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
          var ProfesorJuradoMp: {};
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
          if (ProfesorJuradoMp) {
            console.log(ProfesorJuradoMp);
            return ProfesorJuradoMp;
          }
        }),
      );
      //console.log(ProfesorMapped);
      const Response = {
        Data: ProfesorMapped,
      };
      return Response
    } catch (e) {
      return FailResponse(e.message);
    }
  }
}
