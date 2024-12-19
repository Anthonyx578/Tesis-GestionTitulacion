import { Body, Controller } from '@nestjs/common';
import { RolService } from './rol.service';
import { MessagePattern } from '@nestjs/microservices';
import { rolDTO } from 'src/entitys/DTO/rol.create';
import { PaginationDto } from 'src/pagination/PaginationDTO';

@Controller('rol')
export class RolController {
    constructor(private readonly Services:RolService){}


    @MessagePattern({cmd:'CreateRol'})
        async Create(Rol:rolDTO){
        return  await this.Services.Create(Rol)
    }
    @MessagePattern({cmd:'GetAllRol'})
        async GetAll(Pagination:PaginationDto){
        return await this.Services.GetAll(Pagination);
    }

    @MessagePattern({cmd:'GetRol'})
        async Get(id:number){
        return await this.Services.Get(id);
    }

    @MessagePattern({cmd:'GetByRol'})
        async GetByRol(rol:string){
        return await this.Services.GetByRol(rol);
    }

    @MessagePattern({cmd:'UpdateRol'})
        async Update(data:{id:number,RolData:rolDTO}){
        const {id,RolData} = data;
        return await this.Services.update(id,RolData);
    }

    @MessagePattern({cmd:'DeleteRol'})
    async Delete(id:number){
        return await this.Services.delete(id)
    }

    @MessagePattern({cmd:'RestoreRol'})
    async Restore(id:number){
        return await this.Services.restore(id)
    }
}
