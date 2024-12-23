import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tesis } from './Entitys/tesis.Entity';
import { ILike, Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/pagination/PaginationDTO';
import { tesisDTO } from './Entitys/DTO/tesis.DTO';

@Injectable()
export class TesisService {
  constructor(
    @InjectRepository(tesis)
    private readonly repository: Repository<tesis>,
  ) {}

  async Create(Data: tesisDTO) {
    try {
      const Tesis: Partial<tesis> = {
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

      const Data = await this.repository.find({
        where: { status: 1 },
        select: ['id_tesis', 'titulo','documento', 'fecha','id_docente_tutor','status'],
        skip: (page - 1) * limit,
        take: limit,
        order:{
          id_tesis:'DESC'
        }
      });

      return {
        Data,
        meta: { TotalPages: TotalPages, CurrentPage: page, DataCount: limit },
      };
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async GetAllLike(Pagination: PaginationDto,Like:string) {
    try {
      const { page, limit } = Pagination;

      const TotalData = await this.repository.count({
        where: { status: 1 },
      });
      const TotalPages = Math.ceil(TotalData / limit);

      const Data = await this.repository.find({
        where:{status: 1,titulo:ILike(`%${Like}%`)},
        select:['id_tesis', 'titulo','documento', 'fecha','id_docente_tutor'],
        skip:(page - 1) * limit,
        take: limit,
        order:{
          id_tesis:'DESC'
        }
      });

      return {
        Data,
        meta: { TotalPages: TotalPages, CurrentPage: page, DataCount: limit },
      };
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async Get(id: number){
    try {
      return await this.repository.findOne({
        where: { id_tesis: id, status: 1 },
        select: ['id_tesis','titulo', 'documento','fecha','id_docente_tutor'],
      });
    } catch (e) {
      throw new RpcException(e);
    }
  }
  async update(id: number, ChangeData: tesisDTO) {
    try {
      const ExistData = await this.repository.findOne({
        where: { id_tesis: id, status: 1 },
      });
      if (!ExistData) {
        return {};
      }
      return await this.repository.update(
        { id_tesis: id },
        { ...ChangeData, updated_at: new Date() },
      );
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async delete(id) {
    try {
      const Exist = this.repository.findOne({
        where: { id_tesis: id, status: 1 },
      });
      if (!Exist) {
        return { message: 'Dato no encontrado o ya eliminado' };
      }
      return this.repository.update(
        { id_tesis: id },
        { deleted_at: new Date(), status: 0 },
      );
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async restore(id) {
    try {
      const Exist = this.repository.findOne({
        where: { id_tesis: id, status: 0 },
      });
      if (!Exist) {
        return { message: 'Dato no encontrado o ya restaurado' };
      }
      return this.repository.update(
        { id_tesis: id },
        { deleted_at: null, status: 1 },
      );
    } catch (e) {
      throw new RpcException(e);
    }
  }
}
