import { Injectable,HttpException, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { last } from 'rxjs';
import { rolDTO } from 'src/entitys/DTO/rol.create';
import { rol } from 'src/entitys/rol.entity';
import { PaginationDto } from 'src/pagination/PaginationDTO';
import { Repository } from 'typeorm';
@Injectable()
export class RolService {
    constructor(@InjectRepository(rol) private repositoty:Repository<rol>){
    }

    async Create (Rol:rolDTO){
        try{
            const NewRol = {
                rol: Rol.rol,
                created_at: new Date()
            }
            return await this.repositoty.save(NewRol);
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

            const data = await this.repositoty.find({select:['id_rol','rol','status'],skip:((page - 1) * limit),take:limit})

            return {data,meta:{TotalPages:TotalPages,CurrentPage:page,DataCount:limit}}
       } 
       catch(e){
        throw new RpcException(e)
        }
    }

    async GetByRol(Rol:string){
        try {
            const data = await this.repositoty.findOne({where:{rol:Rol},select:['id_rol']})
            return data;
        } catch (e) {
            throw new RpcException(e)
        }

    }
    async Get (id:number){
        try{
            return await this.repositoty.findOne({where:{id_rol:id,status:1},select:['id_rol','rol']})
        }
        catch(e){
            throw new RpcException(e)
        }
    }
    async update (id:number,ChangeData:rolDTO){
        try{
            const ExistData = await this.repositoty.findOne({where:{id_rol:id,status:1}})
            if(!ExistData){
                return {}
            }
            return this.repositoty.update({ id_rol: id }, { ...ChangeData, updated_at: new Date() });
        }
        catch(e){
            throw new RpcException(e)
        }
    }

    async delete (id){
        try{
            const Exist = this.repositoty.findOne({where:{id_rol:id,status:1}})
            if(!Exist){
                return {message:"Dato no encontrado o ya eliminado"}
            }
            return this.repositoty.update({id_rol:id},{deleted_at:new Date(),status:0})
        }
        catch(e){
            throw new RpcException(e)
        }
    }

    async restore (id){
        try{
            const Exist = this.repositoty.findOne({where:{id_rol:id,status:0}})
            if(!Exist){
                return {message:"Dato no encontrado o ya restaurado"}
            }
            return this.repositoty.update({id_rol:id},{deleted_at:null,status:1})
        }
        catch(e){
            throw new RpcException(e)
        }
    }
}
