import { Controller } from '@nestjs/common';
import { SustentacionService } from './sustentacion.service';
import { MessagePattern } from '@nestjs/microservices';
import { sustentacionDTO } from './Entitys/DTO/sustentacion.DTO';
import { PaginationDto } from 'src/pagination/PaginationDTO';

@Controller('sustentacion')
export class SustentacionController {
    constructor(private readonly Services:SustentacionService){}

    @MessagePattern({cmd:'CreateRequisito'})
    async Create (Requisito:sustentacionDTO){
        return await this.Services.Create(Requisito)
    }

    @MessagePattern({cmd:'GetAllRequisito'})
        async GetAll(Pagination:PaginationDto){
        return await this.Services.GetAll(Pagination);
    }

    @MessagePattern({cmd:'GetRequisito'})
        async Get(id:number){
        return await this.Services.Get(id);
    }

    @MessagePattern({cmd:'UpdateRequisito'})
        async Update(data:{id:number,RequisitoData:sustentacionDTO}){
        const {id,RequisitoData} = data;
        return await this.Services.update(id,RequisitoData);
    }

    @MessagePattern({cmd:'DeleteRequisito'})
    async Delete(id:number){
        return await this.Services.delete(id)
    }

    @MessagePattern({cmd:'RestoreRequisito'})
    async Restore(id:number){
        return await this.Services.restore(id)
    }
}
