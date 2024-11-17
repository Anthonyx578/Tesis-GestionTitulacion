import { MiddlewareConsumer, Module, NestModule, Post, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NestApplication, NestFactory } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MicroservicesmoduleModule } from './Microservices/microservicesmodule.module';
import { AuthMiddleware } from './Middleware/authMiddleware';
import { AuthMiddModuleModule } from './Middleware/auth-midd-module.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MicroservicesmoduleModule,
    AuthMiddModuleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .exclude(
      {path:'authenticacion', method:RequestMethod.POST}
    )
    .forRoutes('*')
  }
}
