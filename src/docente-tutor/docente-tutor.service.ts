import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { docente_Tutor } from 'src/entitys/docenteTutor.entity';
import { docenteTutorUpdateDTO } from 'src/entitys/DTO/docenteTutorUpdateDTO';
import { PaginationDto } from 'src/entitys/DTO/PaginationDTO';
import { Repository } from 'typeorm';

@Injectable()
export class DocenteTutorService {
  constructor(
    @InjectRepository(docente_Tutor)
    private readonly repository: Repository<docente_Tutor>,
  ) {}

  async Create(id_usuario: number) {
    try {
      const DocenteTutor: Partial<docente_Tutor> = {
        id_usuario: id_usuario,
        created_at: new Date(),
      };
      return await this.repository.save(DocenteTutor);
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
        select: ['id_usuario', 'id_docente_tutor'],
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
        where: { id_docente_tutor: id, status: 1 },
        select: ['id_usuario', 'id_docente_tutor'],
      });
    } catch (e) {
      throw new RpcException(e);
    }
  }
  async update(id: number, ChangeData: docenteTutorUpdateDTO) {
    try {
        const ExistData = await this.repository.findOne({
            where: { id_docente_tutor: id, status: 1 },
        });
        if (!ExistData) {
            return null;
        }
        return await this.repository.update(
            { id_docente_tutor: id },
            { ...ChangeData, updated_at: new Date() },
        );
    }catch (e) {
      throw new RpcException(e);
    }
  }

  async delete(id) {
    try {
      const Exist = this.repository.findOne({
        where: { id_docente_tutor: id, status: 1 },
      });
      if (!Exist) {
        return { message: 'Dato no encontrado o ya eliminado' };
      }
      return this.repository.update(
        { id_docente_tutor: id },
        { deleted_at: new Date(), status: 0 },
      );
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async restore(id) {
    try {
      const Exist = this.repository.findOne({
        where: { id_docente_tutor: id, status: 0 },
      });
      if (!Exist) {
        return { message: 'Dato no encontrado o ya restaurado' };
      }
      return this.repository.update(
        { id_docente_tutor: id },
        { deleted_at: null, status: 1 },
      );
    } catch (e) {
      throw new RpcException(e);
    }
  }
}
