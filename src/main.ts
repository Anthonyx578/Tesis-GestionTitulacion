import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {


  const log = new Logger('Servicio de Tesis') 
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,{
      transport:Transport.NATS,
      options:{
        servers: process.env.NAT_SERVER,
        maxReconnectAttempts: -1
      }
    }

  );
  await app.listen();
  log.log('Servicio de tesis funcionando')
}
bootstrap();
