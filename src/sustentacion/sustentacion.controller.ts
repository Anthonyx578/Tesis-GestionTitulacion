import { Controller } from '@nestjs/common';
import { SustentacionService } from './sustentacion.service';
import { MessagePattern } from '@nestjs/microservices';
import { sustentacionDTO } from './Entitys/DTO/sustentacion.DTO';
import { PaginationDto } from 'src/pagination/PaginationDTO';


@Controller('sustentacion')
export class SustentacionController {
    constructor(private readonly Services:SustentacionService){}

    @MessagePattern({cmd:'CreateSustentacion'})
    async Create (sustentacion:Partial<sustentacionDTO>){
        return await this.Services.Create(sustentacion)
    }

    @MessagePattern({cmd:'GetAllSustentacion'})
        async GetAll(Pagination:PaginationDto){
        return await this.Services.GetAll(Pagination);
    }

    @MessagePattern({cmd:'GetSustentacion'})
        async Get(id:number){
        return await this.Services.Get(id);
    }

    @MessagePattern({cmd:'GetSustentacionTesis'})
        async GetTesis(id:number){
        return await this.Services.GetTesis(id);
    }

    @MessagePattern({cmd:'UpdateSustentacion'})
        async Update(data:{id:number,SustentacionData:sustentacionDTO}){
        const {id,SustentacionData} = data;
        return await this.Services.update(id,SustentacionData);
    }

    @MessagePattern({cmd:'DeleteSustentacion'})
    async Delete(id:number){
        return await this.Services.delete(id)
    }

    @MessagePattern({cmd:'RestoreSustentacion'})
    async Restore(id:number){
        return await this.Services.restore(id)
    }
}
