import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TesisModule } from './tesis/tesis.module';
import { RequisitoModule } from './requisito/requisito.module';
import { RequisitoCumplidoModule } from './requisito-cumplido/requisito-cumplido.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { requisito } from './requisito/Entitys/requisitos.entity';
import { tesis } from './tesis/Entitys/tesis.Entity';
import { requisitoCumplido } from './requisito-cumplido/Entitys/requisito-cumplido.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type:"postgres",
      port:Number(process.env.DbPort),
      host: process.env.DbHost,
      username:process.env.DbUserName,
      password:process.env.DbPassWord,
      database:process.env.DbName,
      entities:[requisito,tesis,requisitoCumplido]
    }),
    TesisModule,
    RequisitoModule,
    RequisitoCumplidoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
