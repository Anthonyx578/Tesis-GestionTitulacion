import { Controller } from '@nestjs/common';
import { RequisitoService } from './requisito.service';
import { MessagePattern } from '@nestjs/microservices';
import { requisitoDTO } from './Entitys/DTO/requisito.DTO';
import { PaginationDto } from 'src/pagination/PaginationDTO';

@Controller('requisito')
export class RequisitoController {
    constructor(private readonly Services:RequisitoService){}
    @MessagePattern({cmd:'CreateRequisito'})
    async Create (Requisito:requisitoDTO){
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
        async Update(data:{id:number,RequisitoData:requisitoDTO}){
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
