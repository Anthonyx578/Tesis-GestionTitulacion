import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { usuario } from 'src/entitys/usuario.entity';
import { RolService } from 'src/rol/rol.service';
import { CarreraService } from 'src/carrera/carrera.service';
import { rol } from 'src/entitys/rol.entity';
import { carrera } from 'src/entitys/carrera.entity';

@Module({
  imports:[TypeOrmModule.forFeature([usuario,rol,carrera])],
  controllers: [UsuarioController],
  providers: [UsuarioService,RolService,CarreraService],
  exports:[UsuarioService]
})
export class UsuarioModule {}
