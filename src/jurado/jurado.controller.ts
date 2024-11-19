import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { JuradoService } from './jurado.service';
import { PaginationDto } from 'src/entitys/DTO/PaginationDTO';
import { juradoUpdateDTO } from 'src/entitys/DTO/juradoUpdateDTO';

@Controller('jurado')
export class JuradoController {
    constructor(private readonly Services:JuradoService){}
    
    @MessagePattern({cmd:'CreateJurado'})
    async Create (id_usuario:number){
        return await this.Services.Create(id_usuario)
    }

    @MessagePattern({cmd:'GetAllJurado'})
        async GetAll(Pagination:PaginationDto){
        return await this.Services.GetAll(Pagination);
    }

    @MessagePattern({cmd:'GetJurado'})
        async Get(id:number){
        return await this.Services.Get(id);
    }

    @MessagePattern({cmd:'UpdateJurado'})
        async Update(data:{id:number,JuradoData:juradoUpdateDTO}){
        const {id,JuradoData} = data;
        return await this.Services.update(id,JuradoData);
    }

    @MessagePattern({cmd:'DeleteJurado'})
    async Delete(id:number){
        return await this.Services.delete(id)
    }

    @MessagePattern({cmd:'RestoreJurado'})
    async Restore(id:number){
        return await this.Services.restore(id)
    }
}
