import { Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { estudianteUpdateDTO } from 'src/entitys/DTO/estudianteUpdateDTO';
import { PaginationDto } from 'src/entitys/DTO/PaginationDTO';
import { estudiante } from 'src/entitys/estudiante.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstudianteService {
    constructor(@InjectRepository(estudiante) private readonly repository:Repository<estudiante>){}


    async Create(id_usuario:number){
        try {
            const Estudiante:Partial<estudiante> ={
                id_usuario:id_usuario,
                created_at: new Date()
            } 
            return await this.repository.save(Estudiante)    
        } catch (error) {
            throw new RpcException(error)
        }
        
    }

    async GetAll(Pagination:PaginationDto){
        try{
             const {page,limit} = Pagination;
 
             const TotalData = await this.repository.count({
                 where:{status:1},
             })
             const TotalPages =Math.ceil(TotalData/limit);
 
             const data = await this.repository.find({where:{status:1},select:['id_usuario','id_estudiante','id_tesis'],skip:((page - 1) * limit),take:limit})
          
             return {data,meta:{TotalPages:TotalPages,CurrentPage:page,DataCount:limit}}
        } 
        catch(e){
         throw new RpcException(e)
         }
     }
 
     async Get (id:number){
         try{
             return await this.repository.findOne({where:{id_estudiante:id,status:1},select:['id_usuario','id_estudiante','id_tesis']})
         }
         catch(e){
             throw new RpcException(e)
         }
     }
     async update (id:number,ChangeData:estudianteUpdateDTO){
         try{
             const ExistData = await this.repository.findOne({where:{id_estudiante:id,status:1}})
             if(!ExistData){
                return {}
             }
             return await this.repository.update({ id_estudiante: id }, { ...ChangeData, updated_at: new Date() });
         }
         catch(e){
             throw new RpcException(e)
         }
     }
 
     async delete (id){
         try{
             const Exist = this.repository.findOne({where:{id_estudiante:id,status:1}})
             if(!Exist){
                 return {message:"Dato no encontrado o ya eliminado"}
             }
             return this.repository.update({id_estudiante:id},{deleted_at:new Date(),status:0})
         }
         catch(e){
             throw new RpcException(e)
         }
     }
 
     async restore (id){
         try{
             const Exist = this.repository.findOne({where:{id_estudiante:id,status:0}})
             if(!Exist){
                 return {message:"Dato no encontrado o ya restaurado"}
             }
             return this.repository.update({id_estudiante:id},{deleted_at:null,status:1})
         }
         catch(e){
             throw new RpcException(e)
         }
     }
}
