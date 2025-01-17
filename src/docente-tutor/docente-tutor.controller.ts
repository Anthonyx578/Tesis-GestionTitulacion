import { ConsoleLogger, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { DocenteTutorService } from './docente-tutor.service';
import { PaginationDto } from 'src/pagination/PaginationDTO';
import { docenteTutorUpdateDTO } from 'src/docente-tutor/Entitys/DTO/docenteTutorUpdateDTO';

@Controller('docente-tutor')

export class DocenteTutorController {
    constructor(private readonly Services:DocenteTutorService){}
    @MessagePattern({cmd:'CreateDocenteTutor'})
    async Create (id_usuario:number){
        return await this.Services.Create(id_usuario)
    }

    @MessagePattern({cmd:'GetAllDocenteTutor'})
        async GetAll(Pagination:PaginationDto){
        return await this.Services.GetAll(Pagination);
    }

    @MessagePattern({cmd:'GetAllDocenteTutorNames'})
        async GetAllNames(){
        return await this.Services.GetAllNames();
    }

    @MessagePattern({cmd:'GetDocenteTutor'})
        async Get(id:number){
        return await this.Services.Get(id);
    }

    @MessagePattern({cmd:'GetDocenteTutorByUser'})
        async GetByUser(id:number){
        return await this.Services.GetByUser(id);
    }


    @MessagePattern({cmd:'UpdateDocenteTutor'})
        async Update(data:{id:number,DocenteTutorData:docenteTutorUpdateDTO}){
        const {id,DocenteTutorData} = data;
        return await this.Services.update(id,DocenteTutorData);
    }

    @MessagePattern({cmd:'DeleteDocenteTutor'})
    async Delete(id:number){
        return await this.Services.delete(id)
    }

    @MessagePattern({cmd:'RestoreDocenteTutor'})
    async Restore(id:number){
        return await this.Services.restore(id)
    }
}
