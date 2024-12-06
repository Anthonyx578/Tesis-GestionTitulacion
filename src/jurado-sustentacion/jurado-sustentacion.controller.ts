import { Controller } from '@nestjs/common';
import { juradoSustentacionDTO } from './Entitys/DTO/jurado-sustentacion.DTO';
import { JuradoSustentacionService } from './jurado-sustentacion.service';
import { MessagePattern } from '@nestjs/microservices';
import { PaginationDto } from 'src/pagination/PaginationDTO';

@Controller('jurado-sustentacion')
export class JuradoSustentacionController {
    constructor(private readonly Services:JuradoSustentacionService){}

    @MessagePattern({cmd:'CreateJuradoSustentacion'})
    async Create (Requisito:juradoSustentacionDTO){
        return await this.Services.Create(Requisito)
    }

    @MessagePattern({cmd:'GetAllJuradoSustentacion'})
        async GetAll(Pagination:PaginationDto){
        return await this.Services.GetAll(Pagination);
    }

    @MessagePattern({cmd:'GetJuradoSustentacion'})
        async Get(id:number){
        return await this.Services.Get(id);
    }

    @MessagePattern({cmd:'UpdateJuradoSustentacion'})
        async Update(data:{id:number,RequisitoData:juradoSustentacionDTO}){
        const {id,RequisitoData} = data;
        return await this.Services.update(id,RequisitoData);
    }

    @MessagePattern({cmd:'DeleteJuradoSustentacion'})
    async Delete(id:number){
        return await this.Services.delete(id)
    }

    @MessagePattern({cmd:'RestoreJuradoSustentacion'})
    async Restore(id:number){
        return await this.Services.restore(id)
    }
}
