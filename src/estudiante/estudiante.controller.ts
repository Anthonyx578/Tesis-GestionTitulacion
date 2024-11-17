import { Controller } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { MessagePattern } from '@nestjs/microservices';
import { PaginationDto } from 'src/entitys/DTO/PaginationDTO';
import { estudianteUpdateDTO } from 'src/entitys/DTO/estudianteUpdateDTO';

@Controller('estudiante')
export class EstudianteController {
    constructor(private readonly Services:EstudianteService){}


    @MessagePattern({cmd:'CreateEstudiante'})
    async Create (id_usuario:number){
        return await this.Services.Create(id_usuario)
    }

    @MessagePattern({cmd:'GetAllEstudiante'})
        async GetAll(Pagination:PaginationDto){
        return await this.Services.GetAll(Pagination);
    }

    @MessagePattern({cmd:'GetEstudiante'})
        async Get(id:number){
        return await this.Services.Get(id);
    }

    @MessagePattern({cmd:'UpdateEstudiante'})
        async Update(data:{id:number,UsuarioData:estudianteUpdateDTO}){
        const {id,UsuarioData} = data;
        return await this.Services.update(id,UsuarioData);
    }

    @MessagePattern({cmd:'DeleteEstudiante'})
    async Delete(id:number){
        return await this.Services.delete(id)
    }

    @MessagePattern({cmd:'RestoreEstudiante'})
    async Restore(id:number){
        return await this.Services.restore(id)
    }
}
