import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { AuthenticatorService } from './authenticator.service';
import { UsuarioCreateDTO } from 'src/entitys/DTO/usuario.Create.DTO';

@Controller('authenticator')
export class AuthenticatorController {
    constructor(private readonly service:AuthenticatorService){}

    @MessagePattern('auth.verify.user')
    async VerifyToken(token:string){
        return await this.service.verfifyToken(token);
    }

    @MessagePattern({cmd:'Login'})
    async Login(LoginData:UsuarioCreateDTO){
        return await this.service.Login(LoginData)
    }

    @MessagePattern({cmd:'Token'})
    async Token(Data:{payload:{},Rol:string}){
        const {payload,Rol} = Data
        return await this.service.createToken(payload,Rol)
    }

}
