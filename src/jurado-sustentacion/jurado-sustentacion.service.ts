import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { juradoSustentacionDTO } from './Entitys/DTO/jurado-sustentacion.DTO';
import { PaginationDto } from 'src/pagination/PaginationDTO';
import { juradoSustentacion } from './Entitys/jurado-sustentacion.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JuradoSustentacionService {
    constructor(
        @InjectRepository(juradoSustentacion)
        private readonly repository: Repository<juradoSustentacion>,
      ) {}
    
      async Create(Data: Partial<juradoSustentacionDTO>) {
        try {
          const JuradoSustentacion: Partial<juradoSustentacion> = {
            ...Data,
            created_at: new Date(),
          };
          return await this.repository.save(JuradoSustentacion);
        } catch (error) {
          throw new RpcException(error);
        }
      }
    
      async GetAll(Pagination: PaginationDto) {
        try {
          const { page, limit } = Pagination;
    
          const TotalData = await this.repository.count({
            where: { status: 1 },
          });
          const TotalPages = Math.ceil(TotalData / limit);
    
          const Data = await this.repository.find({
            where: { status: 1 },
            select: ['id','id_jurado','id_sustentacion','indicacion','fecha_indicacion','presente','suplente','documento_revisar','documento_revisado','indicacion'],
            skip: (page - 1) * limit,
            take: limit,
          });
    
          return {
            Data,
            meta: { TotalPages: TotalPages, CurrentPage: page, DataCount: limit },
          };
        } catch (e) {
          throw new RpcException(e);
        }
      }
    
      async GetAllComentarios(idSustentacion){
        try {
          const Comentarios = await this.repository.find({where:{id_sustentacion:idSustentacion,status:1},select:['id','id_jurado','indicacion','fecha_indicacion','estado','status']})
          return Comentarios
        } catch (error) {
          throw new RpcException(error)
        }
      }
      async GetAllJurado(Pagination: PaginationDto,id_jurado:number) {
        try {
          const { page, limit } = Pagination;
    
          const TotalData = await this.repository.count({
            where: { status: 1 },
          });
          const TotalPages = Math.ceil(TotalData / limit);
    
          const Data = await this.repository.find({
            where: { status: 1 ,id_jurado:id_jurado},
            select: ['id','id_jurado','id_sustentacion'],
            skip: (page - 1) * limit,
            take: limit,
          });
    
          return {
            Data,
            meta: { TotalPages: TotalPages, CurrentPage: page, DataCount: limit },
          };
        } catch (e) {
          throw new RpcException(e);
        }
      }

      async GetAllJuradoReporte(id_jurado:number) {
        try {
          const Data = await this.repository.find({
            where: { status: 1 ,id_jurado:id_jurado},
            select: ['id','id_jurado','id_sustentacion'],
          });
    
          return Data
        } catch (e) {
          throw new RpcException(e);
        }
      }

      async GetAllVerJUrados(idSustentacion: number) {
        try {
          console.log(idSustentacion)
          return await this.repository.find({
            where: { id_sustentacion: idSustentacion, status:1 },
            select: ['id','id_jurado'],
          });
        } catch (e) {
          throw new RpcException(e);
        }
      }
      async Get(id: number) {
        try {
          return await this.repository.findOne({
            where: { id: id, status: 1 },
            select: ['id','id_jurado','indicacion','fecha_indicacion','presente','suplente','documento_revisar','documento_revisado','indicacion'],
          });
        } catch (e) {
          throw new RpcException(e);
        }
      }
      async update(id: number, ChangeData: juradoSustentacionDTO) {
        try {
          const ExistData = await this.repository.findOne({
            where: { id: id, status: 1 },
          });
          if (!ExistData) {
            return {};
          }
          return await this.repository.update(
            { id: id },
            { ...ChangeData, updated_at: new Date() },
          );
        } catch (e) {
          throw new RpcException(e);
        }
      }
    
      async delete(id) {
        try {
          const Exist = this.repository.findOne({
            where: { id: id, status: 1 },
          });
          if (!Exist) {
            return { message: 'Dato no encontrado o ya eliminado' };
          }
          return this.repository.update(
            { id: id },
            { deleted_at: new Date(), status: 0 },
          );
        } catch (e) {
          throw new RpcException(e);
        }
      }
    
      async restore(id) {
        try {
          const Exist = this.repository.findOne({
            where: { id: id, status: 0 },
          });
          if (!Exist) {
            return { message: 'Dato no encontrado o ya restaurado' };
          }
          return this.repository.update(
            { id: id },
            { deleted_at: null, status: 1 },
          );
        } catch (e) {
          throw new RpcException(e);
        }
      }
}
