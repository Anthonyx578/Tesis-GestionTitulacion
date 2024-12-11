import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { carrera } from 'src/entitys/carrera.entity';
import { carreraDTO } from 'src/entitys/DTO/carreraDTo';
import { PaginationDto } from 'src/pagination/PaginationDTO';
import { Repository } from 'typeorm';

@Injectable()
export class CarreraService {
    constructor(@InjectRepository(carrera) private repositoty:Repository<carrera>){
    }

    async Create (Carrera:carreraDTO){
        try{
            const NewCarrera:Partial<carrera> = {
                nombre_carrera: Carrera.nombre_carrera,
                created_at: new Date()
            }
            return await this.repositoty.save(NewCarrera);
        }
        catch(e){
            throw new RpcException(e)
        }
    }

    async GetAll(Pagination:PaginationDto){
       try{
            const {page,limit} = Pagination;

            const TotalData = await this.repositoty.count({
                where:{status:1},
            })
            const TotalPages =Math.ceil(TotalData/limit);

            const data = await this.repositoty.find({select:['id_carrera','nombre_carrera'],skip:((page - 1) * limit),take:limit})

            return {data,meta:{TotalPages:TotalPages,CurrentPage:page,DataCount:limit}}
       } 
       catch(e){
        throw new RpcException(e)
        }
    }

    async Get (id:number){
        try{
            return await this.repositoty.findOne({where:{id_carrera:id,status:1},select:['id_carrera','nombre_carrera']})
        }
        catch(e){
            throw new RpcException(e)
        }
    }
    async update (id:number,ChangeData:carreraDTO){
        try{
            const ExistData = await this.repositoty.findOne({where:{id_carrera:id,status:1}})
            if(!ExistData){
                return {}
            }
            return this.repositoty.update({ id_carrera: id }, { ...ChangeData, updated_at: new Date() });
        }
        catch(e){
            throw new RpcException(e)
        }
    }

    async delete (id){
        try{
            const Exist = this.repositoty.findOne({where:{id_carrera:id,status:1}})
            if(!Exist){
                return {message:"Dato no encontrado o ya eliminado"}
            }
            return this.repositoty.update({id_carrera:id},{deleted_at:new Date(),status:0})
        }
        catch(e){
            throw new RpcException(e)
        }
    }

    async restore (id){
        try{
            const Exist = this.repositoty.findOne({where:{id_carrera:id,status:0}})
            if(!Exist){
                return {message:"Dato no encontrado o ya restaurado"}
            }
            return this.repositoty.update({id_carrera:id},{deleted_at:null,status:1})
        }
        catch(e){
            throw new RpcException(e)
        }
    }
}
