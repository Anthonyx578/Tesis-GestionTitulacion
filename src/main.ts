import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, Logger, ValidationError, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const log = new Logger('Servicio de Sustentaicon')
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
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
      whitelist:true,
      forbidNonWhitelisted:true,
      transform: true,
    })
  )
  await app.listen();
  log.log('Servicio de Sustentacion corriendo');
}
bootstrap();
