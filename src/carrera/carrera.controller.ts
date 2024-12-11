import { Controller } from '@nestjs/common';
import { CarreraService } from './carrera.service';
import { MessagePattern } from '@nestjs/microservices';
import { carreraDTO } from 'src/entitys/DTO/carreraDTO';
import { PaginationDto } from 'src/pagination/PaginationDTO';

@Controller('carrera')
export class CarreraController {
    constructor(private readonly Services:CarreraService){}


    @MessagePattern({cmd:'CreateCarrera'})
        async Create(Data:carreraDTO){
        return  await this.Services.Create(Data)
    }
    @MessagePattern({cmd:'GetAllCarrera'})
        async GetAll(Pagination:PaginationDto){
        return await this.Services.GetAll(Pagination);
    }

    @MessagePattern({cmd:'GetCarrera'})
        async Get(id:number){
        return await this.Services.Get(id);
    }

    @MessagePattern({cmd:'UpdateCarrera'})
        async Update(data:{id:number,CarreraData:carreraDTO}){
        const {id,CarreraData} = data;
        return await this.Services.update(id,CarreraData);
    }

    @MessagePattern({cmd:'DeleteCarrera'})
    async Delete(id:number){
        return await this.Services.delete(id)
    }

    @MessagePattern({cmd:'RestoreCarrera'})
    async Restore(id:number){
        return await this.Services.restore(id)
    }
}
