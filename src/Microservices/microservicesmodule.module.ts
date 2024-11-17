import { Module } from '@nestjs/common';
import { RolController } from './rol/rol.controller';
import { UsuarioController } from './usuario/usuario.controller';
import { CarreraController } from './carrera/carrera.controller';
import { ClientsModule,Transport } from '@nestjs/microservices';
import { AuthenticacionController } from './authenticacion/authenticacion.controller';
import { EstudianteController } from './estudiante/estudiante.controller';
@Module({
  imports:[ 
    ClientsModule.register([
    { 
      name: 'NAT_Service', 
      transport: Transport.NATS,
      options: {
        servers: ['nats://localhost:4222'],
        maxReconnectAttempts: -1
      },
    },
  ]),],
  controllers: [RolController, UsuarioController, CarreraController, AuthenticacionController, EstudianteController]
})
export class MicroservicesmoduleModule {}
