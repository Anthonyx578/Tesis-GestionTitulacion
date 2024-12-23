import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/pagination/PaginationDTO';
import { requisitoCumplido } from './Entitys/requisito-cumplido.entity';
import { Repository } from 'typeorm';
import { requisitoCumplidoDTO } from './Entitys/DTO/requisito-cumplido.DTO';
import { InjectRepository } from '@nestjs/typeorm';
import { RequisitoService } from 'src/requisito/requisito.service';

@Injectable()
export class RequisitoCumplidoService {
  constructor(
    @InjectRepository(requisitoCumplido)
    private readonly repository: Repository<requisitoCumplido>,
    private readonly RequisitoService:RequisitoService
  ) {}

  async Create(Data: requisitoCumplidoDTO) {
    try {
      const RequisitoCumplido: Partial<requisitoCumplido> = {
        ...Data,
        created_at: new Date(),
      };
      return await this.repository.save(RequisitoCumplido);
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
        select: [
          'id',
          'id_estudiante',
          'id_requisito',
          'estado',
        ],
        skip: (page - 1) * limit,
        take: limit,
        order: {
          id: 'DESC',
        },
      });

      return {
        data,
        meta: { TotalPages: TotalPages, CurrentPage: page, DataCount: limit },
      };
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async GetAllByEstudiante(Pagination: PaginationDto,Estudiante:number) {
    try {
      const { page, limit } = Pagination;

      const TotalData = await this.repository.count({
        where: { status: 1 },
      });
      const TotalPages = Math.ceil(TotalData / limit);

      const Requisitos = await this.repository.find({
        where: { status: 1,id_estudiante:Estudiante},
        select: [
          'id',
          'id_estudiante',
          'id_requisito',
          'estado',
        ],
        skip: (page - 1) * limit,
        take: limit,
        order: {
          id: 'DESC',
        },
      });
      const Data =await Promise.all( Requisitos.map(async (item)=>{
        const Requisito = await this.RequisitoService.Get(item.id_requisito);
        return {...item,...Requisito}
      }))
      return {
        Data,
        meta: { TotalPages: TotalPages, CurrentPage: page, DataCount: limit },
      };
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async Get(id: number) {
    try {
      return await this.repository.findOne({
        where: { id: id, status: 1 },
        select: [
          'id',
          'id_estudiante',
          'id_requisito',
          'estado',
        ],
      });
    } catch (e) {
      throw new RpcException(e);
    }
  }
  async update(id: number, ChangeData: requisitoCumplidoDTO) {
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
