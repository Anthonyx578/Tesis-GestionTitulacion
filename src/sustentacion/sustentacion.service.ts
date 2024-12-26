import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { sustentacionDTO } from './Entitys/DTO/sustentacion.DTO';
import { PaginationDto } from 'src/pagination/PaginationDTO';
import { sustentacion } from './Entitys/sustentacion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SustentacionService {
    constructor(
        @InjectRepository(sustentacion)
        private readonly repository: Repository<sustentacion>,
      ) {}
      async Create(Data: Partial<sustentacionDTO>) {
        try {
          const Sustentacion: Partial<sustentacion> = {
            ...Data,
            created_at: new Date(),
          };
          return await this.repository.save(Sustentacion);
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
            select: ['id_sustentacion','id_tesis','id_carrera','fecha_sustentacion','periodo_academico','tipo','estado_sustentacion'],
            skip: (page - 1) * limit,
            take: limit,
            order:{
              id_sustentacion:'DESC'
            }
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
            where: { id_sustentacion: id, status: 1 },
            select: ['id_sustentacion','id_tesis','id_carrera','fecha_sustentacion','periodo_academico','tipo','estado_sustentacion'],
          });
        } catch (e) {
          throw new RpcException(e);
        }
      }
      async update(id: number, ChangeData: sustentacionDTO) {
        try {
          const ExistData = await this.repository.findOne({
            where: { id_sustentacion: id, status: 1 },
          });
          if (!ExistData) {
            return {};
          }
          return await this.repository.update(
            { id_sustentacion: id },
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
            { id_sustentacion: id },
            { deleted_at: new Date(), status: 0 },
          );
        } catch (e) {
          throw new RpcException(e);
        }
      }
    
      async restore(id) {
        try {
          const Exist = this.repository.findOne({
            where: { id_sustentacion: id, status: 0 },
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
