import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { jwtpayload } from './Interfaces/payloadinterface';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { UsuarioCreateDTO } from 'src/entitys/DTO/usuario.Create.DTO';
import { UsuarioService } from 'src/usuario/usuario.service';
import { RolService } from 'src/rol/rol.service';
import { CarreraService } from 'src/carrera/carrera.service';

@Injectable()
export class AuthenticatorService {
    constructor( 
        private readonly jwtService:JwtService,
        private readonly UsuarioService:UsuarioService,
        private readonly RolService:RolService,
        private readonly CarreraService:CarreraService
    ){}

    async Login(LoginData:UsuarioCreateDTO){
        try {
            const {nombre_usuario, contrasena} = LoginData
            const usuario = await this.UsuarioService.FindbyUser(nombre_usuario)
            if(!usuario){
                throw new RpcException('Usuario o contraseña incorrectos')
            }
            const {id_usuario,id_carrera,id_rol} = usuario
            const Dbcontrasena = usuario.contrasena;

            const compare = await bcrypt.compare(contrasena,Dbcontrasena)
            if(!compare){
                throw new RpcException('Usuario o contraseña incorrectos')
            }
            const RolName = await this.ObtainRolName(id_rol);
            const CarreraName = await this.obtainCarreraName(id_carrera)
            const Payload = {
                id:id_usuario,
                usuario: nombre_usuario,
                rol:RolName,
                carrera:CarreraName
            }
            return this.createToken(Payload)
        } catch (error) {
            throw new RpcException(error)
        }
    }


    async ObtainRolName (id_rol:number){
        const Rol = await this.RolService.Get(id_rol);
        return Rol.rol;
    }

    async obtainCarreraName(id_carrera:number){
        const Carrera = await this.CarreraService.Get(id_carrera);
        return Carrera.nombre_carrera
    }


    async createToken (payload:jwtpayload){
        try{
            return await this.jwtService.sign(payload);
        }
        catch(error){
            throw new RpcException('Error al crear el token: ' + error.message);
        }
    }


    async verfifyToken (token:string){
        try{
            const Verify = this.jwtService.verify(token);
            return Verify;
        }
        catch(error){
            throw new RpcException('Accion no autorizada por el token');
        }

    }

    
}
