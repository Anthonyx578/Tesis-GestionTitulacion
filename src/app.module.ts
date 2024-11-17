import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticatorModule } from './authenticator/authenticator.module';
import { UsuarioModule } from './usuario/usuario.module';
import { RolModule } from './rol/rol.module';
import { CarreraModule } from './carrera/carrera.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userInfo } from 'os';
import { rol } from './entitys/rol.entity';
import { carrera } from './entitys/carrera.entity';
import { usuario } from './entitys/usuario.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DbHost,
      port: Number(process.env.DbPort),
      username: process.env.DbUserName,
      password: process.env.DbPassWord,
      database: process.env.DbName,
      entities: [rol,carrera,usuario],
    }),
    AuthenticatorModule,
    UsuarioModule,
    RolModule,
    CarreraModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
