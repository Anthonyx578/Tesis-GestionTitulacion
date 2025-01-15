import { Module } from '@nestjs/common';
import { RolController } from './rol/rol.controller';
import { UsuarioController } from './usuario/usuario.controller';
import { CarreraController } from './carrera/carrera.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthenticacionController } from './authenticacion/authenticacion.controller';
import { EstudianteController } from './estudiante/estudiante.controller';
import { DocenteTutorController } from './docente-tutor/docente-tutor.controller';
import { JuradoController } from './jurado/jurado.controller';
import { ConfigModule } from '@nestjs/config';
import { TesisController } from './tesis/tesis.controller';
import { RequisitoController } from './requisito/requisito.controller';
import { SustentacionController } from './sustentacion/sustentacion.controller';
import { JuradoSustentacionController } from './jurado-sustentacion/jurado-sustentacion.controller';
import { RequisitoCumplidoController } from './requisito-cumplido/requisito-cumplido.controller';
import { FilesController } from './files/files.controller';
import { ReportajeController } from './reportaje/reportaje.controller';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: process.env.Servicio,
        transport: Transport.NATS,
        options: {
          servers: ['nats://157.245.92.194:4222'],
          maxReconnectAttempts: -1,
        },
      },
    ]),
  ],
  controllers: [
    RolController,
    UsuarioController,
    CarreraController,
    AuthenticacionController,
    EstudianteController,
    DocenteTutorController,
    JuradoController,
    TesisController,
    RequisitoController,
    SustentacionController,
    JuradoSustentacionController,
    RequisitoCumplidoController,
    FilesController,
    ReportajeController,
  ],
})
export class MicroservicesmoduleModule {}
