import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { first, firstValueFrom } from 'rxjs';

@Controller('reportaje')
export class ReportajeController {
  constructor(@Inject('NAT_Service') private readonly client: ClientProxy) {}

  @ApiTags('Reportaje')
  @Get()
  async RequisitosCumplidos() {
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
    const Requisitos = await firstValueFrom( this.client.send(
        {cmd:'GetAllByEstudianteRequisitoCumplido'},EstudiantesIDs
    ))

    console.log(NombresEstudiantes);
    return NombresEstudiantes;
  }
}
