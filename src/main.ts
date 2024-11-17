import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const Log = new Logger('Servicio de Usuarios')
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,{
      transport:Transport.NATS,
      options:{
        servers: process.env.NAT_SERVER,
        maxReconnectAttempts: -1
      }
    }
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true,
      transform: true,
    })
  )
  await app.listen();
  Log.log('Servicio de Usuarios corriendo');
}
bootstrap();
