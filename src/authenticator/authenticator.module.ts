import { Module } from '@nestjs/common';
import { AuthenticatorController } from './authenticator.controller';
import { AuthenticatorService } from './authenticator.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { usuario } from 'src/entitys/usuario.entity';
import { rol } from 'src/entitys/rol.entity';
import { carrera } from 'src/entitys/carrera.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { RolService } from 'src/rol/rol.service';
import { CarreraService } from 'src/carrera/carrera.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([usuario,rol,carrera]),
    JwtModule.register({
    global:true,
    secret:'L4pM8@tV7x%Q0zB6D2k!H3sJ',
    signOptions:{expiresIn:'2h'}
  })],
  controllers: [AuthenticatorController],
  providers: [AuthenticatorService,UsuarioService,RolService,CarreraService]
})
export class AuthenticatorModule {}
