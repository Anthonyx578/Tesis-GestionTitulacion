import { Controller } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { MessagePattern } from '@nestjs/microservices';
import { UsuarioCreateDTO } from 'src/entitys/DTO/usuario.Create.DTO';
import { PaginationDto } from 'src/pagination/PaginationDTO';
import { UsuarioUpdateDTO } from 'src/entitys/DTO/usuario.Update.DTO';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly Services:UsuarioService){}


    @MessagePattern({cmd:'CreateUsuario'})
        async Create(Data:UsuarioUpdateDTO){
        return  await this.Services.Create(Data)
    }
    @MessagePattern({cmd:'GetAllUsuario'})
        async GetAll(Pagination:PaginationDto){
        return await this.Services.GetAll(Pagination);
    }

    @MessagePattern({cmd:'GetUsuario'})
        async Get(id:number){
        return await this.Services.Get(id);
    }

    @MessagePattern({cmd:'UpdateUsuario'})
        async Update(data:{id:number,UsuarioData:UsuarioUpdateDTO}){
        const {id,UsuarioData} = data;
        return await this.Services.update(id,UsuarioData);
    }

    @MessagePattern({cmd:'DeleteUsuario'})
    async Delete(id:number){
        return await this.Services.delete(id)
    }

    @MessagePattern({cmd:'RestoreUsuario'})
    async Restore(id:number){
        return await this.Services.restore(id)
    }
}
