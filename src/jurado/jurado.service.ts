import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { juradoUpdateDTO } from 'src/jurado/Entitys/DTO/juradoUpdateDTO';
import { PaginationDto } from 'src/pagination/PaginationDTO';
import { jurado } from 'src/jurado/Entitys/jurado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JuradoService {
  constructor(
    @InjectRepository(jurado)
    private readonly repository: Repository<jurado>,
  ){}

  async Create(id_usuario: number) {
    try {
      const Estudiante: Partial<jurado> = {
        id_usuario: id_usuario,
        created_at: new Date(),
      };
      return await this.repository.save(Estudiante);
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
        select: ['id_usuario', 'id_jurado'],
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
        where: { id_jurado: id, status: 1 },
        select: ['id_usuario', 'id_jurado'],
      });
    } catch (e) {
      throw new RpcException(e);
    }
  }
  async update(id: number, ChangeData: juradoUpdateDTO) {
    try {
      const ExistData = await this.repository.findOne({
        where: { id_jurado: id, status: 1 },
      });
      if (!ExistData) {
        return {};
      }
      return await this.repository.update(
        { id_jurado: id },
        { ...ChangeData, updated_at: new Date() },
      );
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async delete(id) {
    try {
      const Exist = this.repository.findOne({
        where: { id_jurado: id, status: 1 },
      });
      if (!Exist) {
        return { message: 'Dato no encontrado o ya eliminado' };
      }
      return this.repository.update(
        { id_jurado: id },
        { deleted_at: new Date(), status: 0 },
      );
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async restore(id) {
    try {
      const Exist = this.repository.findOne({
        where: { id_jurado: id, status: 0 },
      });
      if (!Exist) {
        return { message: 'Dato no encontrado o ya restaurado' };
      }
      return this.repository.update(
        { id_jurado: id },
        { deleted_at: null, status: 1 },
      );
    } catch (e) {
      throw new RpcException(e);
    }
  }
}
