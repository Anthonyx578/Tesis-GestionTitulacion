import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger,  } from '@nestjs/common';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const Log = new Logger('Main Broadcast')

  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
  .setTitle('Gestion de Sustentacion')
  .setDescription('Api para la gestion de las sustentaciones')
  .setVersion('1.0')
  .addTag('cats')
  .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000', // Reemplaza con el dominio de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Permite enviar cookies con solicitudes CORS
  });
  await app.listen(process.env.Port);

  Log.log('Servicio principal Main Broadcast corriendo en el puerto '+ process.env.Port);
  Log.log('Servicio principal Main Broadcast corriendo en http://localhost:'+ process.env.Port + '/api');

}
bootstrap();
