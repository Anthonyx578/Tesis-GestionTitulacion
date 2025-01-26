import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { first, firstValueFrom, map } from 'rxjs';
import { ExeptValidator } from 'src/ExceptionValidator/ExceptionValidator';
import {
  FailResponse,
  PaginatedMappedResponse,
  PaginatedSuccessResponse,
} from 'src/Response/Responses';
import { tesisRepDTO } from './DTO/TesisRepDTO';
import { RequisitoController } from '../requisito/requisito.controller';
import { Usuario } from '../DTO/usuario.Entity';
import { sustentacionDTO } from '../sustentacion/DTO/sustentacion.DTO';
import { docenteTutorUpdateDTO } from '../DTO/docenteTutorUpdateDTO';
import { DocenteTutorRepDTO } from './DTO/DocenteTutorRepDTO';
import { UsuariosNameRepDTO } from './DTO/UsuariosNameDTO';
import { SustentacionRepDTO } from './DTO/SustentacionRepDTO';
import { CarreraRepDTO } from './DTO/CarreraReoDTO';
import { EstudianteRepDTO } from './DTO/EstudianteRepDTO';
import { JuradosSustentacionRepDTO } from './DTO/JuradoSustentacionRepDTO';
import { juradoRepDTO } from './DTO/JuradoRepDTO';

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
      const Tesis: tesisRepDTO[] = await this.GetTesisByPeriodo(Periodo);
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

  async GetTesisByPeriodo(Periodo: string): Promise<tesisRepDTO[]> {
    const Tesis: tesisRepDTO[] = await firstValueFrom(
      this.client.send({ cmd: 'GetAllTesisByPeriod' }, Periodo),
    );
    return Tesis;
  }
/*
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
                { cmd: 'GetDocenteTutorByUserRep' },
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
      return Response;
    } catch (e) {
      return FailResponse(e.message);
    }
  }
*/

@ApiTags('Reportaje')
@Get('UsuariosProfesores')
async GetAllProfesores() {
  try {
    // Obtener los IDs de los usuarios con rol de profesor
    const idRol = await firstValueFrom(
      this.client.send({ cmd: 'GetByRol' }, 'profesor'),
    );

    // Obtener todos los usuarios activos con el rol de profesor
    const ProfesoresResponse: { Data: Usuario[]; meta: {} } = await firstValueFrom(
      this.client.send({ cmd: 'GetAllUsuarioByRolReporte' }, { ...idRol }),
    );

    const { Data: Profesores } = ProfesoresResponse;

    // Obtener información adicional (Tutor y Jurado) de todos los profesores
    const ProfesoresData = await Promise.all(
      Profesores.map(async (profesor) => {
        const Istutor = await firstValueFrom(
          this.client.send(
            { cmd: 'GetDocenteTutorByUserRep' },
            profesor.id_usuario,
          ),
        );

        const IsJurado = await firstValueFrom(
          this.client.send(
            { cmd: 'GetJuradoByUser' },
            profesor.id_usuario,
          ),
        );

        // Construir el objeto del profesor con los datos adicionales
        const ProfesorData: any = {
          ...profesor,
          isTutor: Istutor ? 1 : 0,
          id_docente_tutor: Istutor?.id_docente_tutor || null,
          statusTutor: Istutor?.status || null,
          isJurado: IsJurado ? 1 : 0,
          id_jurado: IsJurado?.id_jurado || null,
          statusJurado: IsJurado?.status || null,
        };

        return ProfesorData;
      }),
    );

    // Filtrar los profesores para incluir solo los activos
    const ProfesorMapped = ProfesoresData.filter((profesor) => {
      // Excluir profesores que no son activos ni como tutor ni como jurado
      return profesor.isTutor || profesor.isJurado;
    });

    return {
      Data: ProfesorMapped,
    };
  } catch (e) {
    return FailResponse(e.message);
  }
}


  @ApiTags('Reportaje')
  @Get('SustentacionJurado')
  async GetAllJurado(@Query('idJurado') id_jurado: number) {
    try {
      const Data = await firstValueFrom(
        this.client.send(
          { cmd: 'GetAllJuradoSustentacionJuradoReporte' },
          { id_jurado },
        ),
      );
      console.log('Sali con esto', Data);

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
      const carreras = await this.MappearCarrera(Sustentaicones);
      const tesis = await this.MappearTesis(Sustentaicones);
      const SustentacionMapeada = Sustentaicones.map((sustentacion, index) => {
        return {
          ...sustentacion,
          carrera: carreras[index].nombre_carrera,
          tesis: tesis[index].titulo,
        };
      });

      return SustentacionMapeada;
    } catch (e) {
      return FailResponse(e);
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
    return Carrera;
  }

  async MappearTesis(Sustentaciones: any[]) {
    const Tesis = await Promise.all(
      Sustentaciones.map(async (sustentacion) => {
        const tesis = await firstValueFrom(
          this.client.send({ cmd: 'GetTesis' }, sustentacion.id_tesis),
        );
        return tesis;
      }),
    );
    return Tesis;
  }

  @ApiTags('Reportaje')
  @Get('ReporteSustentaciones')
  async ReporteSustentaciones(@Query('Periodo') Periodo: string) {
    const Sustentaicones = await this.GetSustentacionesPeriodo(Periodo);
    const Tesis = await this.GetTesisPeriodo(Sustentaicones);
    const DocentesTutores = await this.GetDocentesTutoresByTesis(Tesis);
    const DocentesName = await this.GetUsuariosName(DocentesTutores);
    const Carrera = await this.GetCarrera(Sustentaicones);
    const Estudiantes = await this.GetEstudiantes(Sustentaicones);
    const EstudiantesName = await this.GetUsuariosName(Estudiantes);
    const JuradosSustentacion = await this.GetJuradosSustentacion(Sustentaicones);
    const Jurados = await this.GetJurados(JuradosSustentacion);
    const JuradosName = await this.GetUsuariosName(Jurados)
    // Datos obtenidos------------------------------------------------------
    //Logica de Mapeo ------------------------------------------------------
    const SustentacionesXTesis = Sustentaicones.map((sustentaciones) => {
      const tesis = Tesis.find(
        (tesis) => tesis.id_tesis === sustentaciones.id_tesis,
      );
      const IDdocenteTutor = tesis.id_docente_tutor;
      const docenteTutor = DocentesTutores.find(
        (docentestutores) =>
          docentestutores.id_docente_tutor === IDdocenteTutor,
      );
      const docenteNombre = DocentesName.find(
        (docentes) => docentes.id_usuario === docenteTutor.id_usuario,
      );
      const carrera = Carrera.find(
        (carrera) => carrera.id_carrera === sustentaciones.id_carrera,
      );
      const estudiantes = Estudiantes.filter(
        (estudiantes) => estudiantes.id_tesis === sustentaciones.id_tesis,
      );
      const estudiantesNames = estudiantes.map((estudiantesId) => {
        const Names = EstudiantesName.find(
          (estudiantesName) =>
            estudiantesName.id_usuario === estudiantesId.id_usuario,
        );
        return {
          estudianteNombres: `${Names.apellidos} ${Names.nombres}`,
          cedula: Names.cedula,
        };
      });
      const juradosSustentacionBuscar = JuradosSustentacion.filter( juradosSus =>
        juradosSus.id_sustentacion === sustentaciones.id_sustentacion)

      const jurados = juradosSustentacionBuscar.map( juradosSus =>{
        const juraditos = Jurados.find(jurados => juradosSus.id_jurado === jurados.id_jurado)
        return juraditos
      })

      const juradosNombres = jurados.map( juraditos =>{
        const nombres = JuradosName.find( nombre => nombre.id_usuario === juraditos.id_usuario)
        return {juradoNombres: `${nombres.apellidos} ${nombres.nombres}`}
      })

      delete sustentaciones.id_sustentacion;
      delete sustentaciones.id_carrera;
      delete sustentaciones.id_tesis;
      delete carrera.id_carrera;
      delete tesis.periodo;
      delete tesis.id_tesis;
      delete tesis.documento;
      delete tesis.id_docente_tutor;
      delete tesis.fecha;
      delete docenteTutor.id_docente_tutor;
      delete docenteNombre.id_carrera;

      
      return {
        ...sustentaciones,
        ...tesis,
        docenteTutorNombres: `${docenteNombre.nombres} ${docenteNombre.apellidos}`,
        carrera: carrera.nombre_carrera,
        estudiante1: estudiantesNames[0] || null,
        estudiante2: estudiantesNames[1] || null,
        jurado1: juradosNombres[0] || null,
        jurado2: juradosNombres[1] || null,

      };
    });
    return SustentacionesXTesis;
  }

  async GetJurados(JuradosSustentacion:JuradosSustentacionRepDTO[]):Promise<juradoRepDTO[]>{
    return await Promise.all(
      JuradosSustentacion.map(async juradosSustentacion =>{
        return await firstValueFrom(this.client.send({cmd:'GetJurado'},juradosSustentacion.id_jurado))
      })
    )
  }

  async GetJuradosSustentacion(Sustentaciones: SustentacionRepDTO[]):Promise<JuradosSustentacionRepDTO[]> {
    const JuradosSustentacion =  await Promise.all(
      Sustentaciones.map(async (sustentaciones) => {
        return await firstValueFrom(this.client.send({cmd:'GetSustentacionVerJurados'},sustentaciones.id_sustentacion))
      }),
    );
    return JuradosSustentacion.flat()
  }

  async GetEstudiantes(
    Sustentaciones: SustentacionRepDTO[],
  ): Promise<EstudianteRepDTO[]> {
    const Estudiantes = await Promise.all(
      Sustentaciones.map(async (sustentaciones) => {
        return await firstValueFrom(
          this.client.send(
            { cmd: 'GetAllEstudianteTesis' },
            sustentaciones.id_tesis,
          ),
        );
      }),
    );
    return Estudiantes.flat();
  }

  async GetCarrera(
    Sustentaciones: SustentacionRepDTO[],
  ): Promise<CarreraRepDTO[]> {
    return await Promise.all(
      Sustentaciones.map(async (sustentaciones) => {
        const Carrera = await firstValueFrom(
          this.client.send({ cmd: 'GetCarrera' }, sustentaciones.id_carrera),
        );
        return Carrera;
      }),
    );
  }

  async GetUsuariosName(Usuarios: DocenteTutorRepDTO[] | EstudianteRepDTO[] | juradoRepDTO[]) {
    const Names = await Promise.all(
      Usuarios.map(async (usuarios) => {
        const Nombres: UsuariosNameRepDTO = await firstValueFrom(
          this.client.send({ cmd: 'GetUsuarioNames' }, usuarios.id_usuario),
        );
        return Nombres;
      }),
    );
    return Names;
  }

  async GetDocentesTutoresByTesis(
    Tesis: tesisRepDTO[],
  ): Promise<DocenteTutorRepDTO[]> {
    return await Promise.all(
      Tesis.map(async (tesis) => {
        const DocentesTutores = await firstValueFrom(
          this.client.send({ cmd: 'GetDocenteTutor' }, tesis.id_docente_tutor),
        );
        return DocentesTutores;
      }),
    );
  }
  async GetSustentacionesPeriodo(
    Periodo: string,
  ): Promise<SustentacionRepDTO[]> {
    return await firstValueFrom(
      this.client.send({ cmd: 'GetAllSustentacionByPeriodo' }, Periodo),
    );
  }

  async GetTesisPeriodo(
    Sustentaciones: sustentacionDTO[],
  ): Promise<tesisRepDTO[]> {
    const Tesis: tesisRepDTO[] = await Promise.all(
      Sustentaciones.map(async (sustentaciones) => {
        const tesis: tesisRepDTO = await firstValueFrom(
          this.client.send({ cmd: 'GetTesis' }, sustentaciones.id_tesis),
        );
        return tesis;
      }),
    );
    return Tesis;
  }
}
