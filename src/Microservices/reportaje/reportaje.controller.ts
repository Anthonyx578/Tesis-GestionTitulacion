import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { first, firstValueFrom } from 'rxjs';
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
          const nombres: { apellidos: string; nombres: string } =
            await firstValueFrom(
              this.client.send(
                { cmd: 'GetUsuarioNames' },
                estudiantesIDs.id_usuario,
              ),
            );
          return { nombres: `${nombres.apellidos} ${nombres.apellidos}` };
        }),
      );
      console.log(EstudiantesIDs);
      const IDEstudiantes = EstudiantesIDs.map((ids) => ids.id_usuario);


      const Requisitos = await Promise.all(
        IDEstudiantes.map(async (id) => {
          const Req = await firstValueFrom(
            await this.client.send(
              { cmd: 'GetAllByEstudianteRequisitoCumplido' },
              IDEstudiantes,
            ),
          );

          return Req
        }),
      );
      
      return NombresEstudiantes;
    } catch (error) {
      return FailResponse(error);
    }
  }
}
