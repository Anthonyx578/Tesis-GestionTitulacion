import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/pagination/PaginationDTO';
import { requisito } from './Entitys/requisitos.entity';
import { Repository } from 'typeorm';
import { requisitoDTO } from './Entitys/DTO/requisito.DTO';

@Injectable()
export class RequisitoService {
    constructor(
        @InjectRepository(requisito)
        private readonly repository: Repository<requisito>,
      ) {}
    
      async Create(Data: requisitoDTO) {
        try {
          const Tesis: Partial<requisito> = {
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
          console.log(page)
          console.log(limit)
          const TotalData = await this.repository.count({
            where: { status: 1 },
          });
          const TotalPages = Math.ceil(TotalData / limit);
    
          const data = await this.repository.find({
            where: { status: 1 },
            select: ['id_requisito','documento'],
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
            where: { id_requisito: id, status: 1 },
            select: ['id_requisito', 'documento'],
          });
        } catch (e) {
          throw new RpcException(e);
        }
      }
      async update(id: number, ChangeData: requisitoDTO) {
        try {
          const ExistData = await this.repository.findOne({
            where: { id_requisito: id, status: 1 },
          });
          if (!ExistData) {
            return {};
          }
          return await this.repository.update(
            { id_requisito: id },
            { ...ChangeData, updated_at: new Date() },
          );
        } catch (e) {
          throw new RpcException(e);
        }
      }
    
      async delete(id) {
        try {
          const Exist = this.repository.findOne({
            where: { id_requisito: id, status: 1 },
          });
          if (!Exist) {
            return { message: 'Dato no encontrado o ya eliminado' };
          }
          return this.repository.update(
            { id_requisito: id },
            { deleted_at: new Date(), status: 0 },
          );
        } catch (e) {
          throw new RpcException(e);
        }
      }
    
      async restore(id) {
        try {
          const Exist = this.repository.findOne({
            where: { id_requisito: id, status: 0 },
          });
          if (!Exist) {
            return { message: 'Dato no encontrado o ya restaurado' };
          }
          return this.repository.update(
            { id_requisito: id },
            { deleted_at: null, status: 1 },
          );
        } catch (e) {
          throw new RpcException(e);
        }
      }
}
