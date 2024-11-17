import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudianteModule } from './estudiante/estudiante.module';
import { DocenteTutorModule } from './docente-tutor/docente-tutor.module';
import { JuradoModule } from './jurado/jurado.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { estudiante } from './entitys/estudiante.entity';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: process.env.DbHost,
      port: Number(process.env.DbPort),
      username: process.env.DbUserName,
      password: process.env.DbPassWord,
      database: process.env.DbName,
      entities: [estudiante],
      
    }),
    EstudianteModule,
    DocenteTutorModule, 
    JuradoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
