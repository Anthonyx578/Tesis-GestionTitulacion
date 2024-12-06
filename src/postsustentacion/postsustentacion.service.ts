import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { postsustentacion } from './Entitys/postsustentacion.Entity';
import { Repository } from 'typeorm';
import { postsustentacionDTO } from './Entitys/DTO/postsustentacion.DTO';
import { RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/pagination/PaginationDTO';

@Injectable()
export class PostsustentacionService {
    constructor(
        @InjectRepository(postsustentacion)
        private readonly repository: Repository<postsustentacion>,
      ) {}
    
      async Create(Data: postsustentacionDTO) {
        try {
          const Tesis: Partial<postsustentacion> = {
            ...Data,
            created_at: new Date(),
          };
          return await this.repository.save(Tesis);
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
    
          const data = await this.repository.find({
            where: { status: 1 },
            select: ['id_postSustentacion','id_estudiante','id_sustentacion','calificacion'],
            skip: (page - 1) * limit,
            take: limit,
          });
    
          return {
            data,
            meta: { TotalPages: TotalPages, CurrentPage: page, DataCount: limit },
          };
        } catch (e) {
          throw new RpcException(e);
        }
      }
    
      async Get(id: number) {
        try {
          return await this.repository.findOne({
            where: { id_postSustentacion: id, status: 1 },
            select: ['id_postSustentacion','id_estudiante','id_sustentacion','calificacion'],
          });
        } catch (e) {
          throw new RpcException(e);
        }
      }
      async update(id: number, ChangeData: postsustentacionDTO) {
        try {
          const ExistData = await this.repository.findOne({
            where: { id_sustentacion: id, status: 1 },
          });
          if (!ExistData) {
            return {};
          }
          return await this.repository.update(
            { id_postSustentacion: id },
            { ...ChangeData, updated_at: new Date() },
          );
        } catch (e) {
          throw new RpcException(e);
        }
      }
    
      async delete(id) {
        try {
          const Exist = this.repository.findOne({
            where: { id_sustentacion: id, status: 1 },
          });
          if (!Exist) {
            return { message: 'Dato no encontrado o ya eliminado' };
          }
          return this.repository.update(
            { id_postSustentacion: id },
            { deleted_at: new Date(), status: 0 },
          );
        } catch (e) {
          throw new RpcException(e);
        }
      }
    
      async restore(id) {
        try {
          const Exist = this.repository.findOne({
            where: { id_postSustentacion: id, status: 0 },
          });
          if (!Exist) {
            return { message: 'Dato no encontrado o ya restaurado' };
          }
          return this.repository.update(
            { id_sustentacion: id },
            { deleted_at: null, status: 1 },
          );
        } catch (e) {
          throw new RpcException(e);
        }
      }
}
