import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { postsustentacionDTO } from './Entitys/DTO/postsustentacion.DTO';
import { PostsustentacionService } from './postsustentacion.service';
import { PaginationDto } from 'src/pagination/PaginationDTO';

@Controller('postsustentacion')
export class PostsustentacionController {
    constructor(private readonly Services:PostsustentacionService){}

    @MessagePattern({cmd:'CreatePostSustentacion'})
    async Create (Requisito:postsustentacionDTO){
        return await this.Services.Create(Requisito)
    }

    @MessagePattern({cmd:'GetAllPostSustentacion'})
        async GetAll(Pagination:PaginationDto){
        return await this.Services.GetAll(Pagination);
    }

    @MessagePattern({cmd:'GetPostSustentacion'})
        async Get(id:number){
        return await this.Services.Get(id);
    }

    @MessagePattern({cmd:'UpdatePostSustentacion'})
        async Update(data:{id:number,RequisitoData:postsustentacionDTO}){
        const {id,RequisitoData} = data;
        return await this.Services.update(id,RequisitoData);
    }

    @MessagePattern({cmd:'DeletePostSustentacion'})
    async Delete(id:number){
        return await this.Services.delete(id)
    }

    @MessagePattern({cmd:'RestorePostSustentacion'})
    async Restore(id:number){
        return await this.Services.restore(id)
    }
}
