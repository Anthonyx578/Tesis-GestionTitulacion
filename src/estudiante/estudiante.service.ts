import { Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { estudianteUpdateDTO } from 'src/estudiante/Entitys/DTO/estudianteUpdateDTO';
import { PaginationDto } from 'src/pagination/PaginationDTO';
import { estudiante } from 'src/estudiante/Entitys/estudiante.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(estudiante)
    private readonly repository: Repository<estudiante>,
  ) {}

  async Create(id_usuario: number) {
    try {
      const Used = await this.repository.find({
        where: { id_usuario: id_usuario },
      });
      console.log(Used);
      if (Used.length == 0) {
        const Estudiante: Partial<estudiante> = {
          id_usuario: id_usuario,
          created_at: new Date(),
        };
        return await this.repository.save(Estudiante);
      } else {
        throw new RpcException('El usuario ya esta en uso');
      }
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async GetAll(Pagination: PaginationDto, Like) {
    try {
      const { page, limit } = Pagination;
      const TotalData = await this.repository.count({
        where: { status: 1 },
      });
      const TotalPages = Math.ceil(TotalData / limit);
      Like = Like || '';
      const Data = await this.repository.find({
        where: [
          { sexo: ILike(`%${Like}%`) },
          { genero: ILike(`%${Like}%`) },
          { estado_civil: ILike(`%${Like}%`) },
          { pais: ILike(`%${Like}%`) },
          { provincia: ILike(`%${Like}%`) },
          { ciudad: ILike(`%${Like}%`) },
          { parroquia: ILike(`%${Like}%`) },
          { direccion: ILike(`%${Like}%`) },
          { tipo_colegio: ILike(`%${Like}%`) },
        ],
        select: [
          'id_usuario',
          'id_estudiante',
          'id_tesis',
          'sexo',
          'genero',
          'estado_civil',
          'pais',
          'provincia',
          'ciudad',
          'parroquia',
          'direccion',
          'numero_hijos',
          'tipo_colegio',
        ],
        skip: (page - 1) * limit,
        take: limit,
        order: {
          id_estudiante: 'DESC',
        },
      });
      return {
        Data,
        meta: { TotalPages: TotalPages, CurrentPage: page, DataCount: limit },
      };
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async GetAllNames() {
    try {
      const Data = await this.repository.find({
        select: [
          'id_usuario',
          'id_estudiante'
        ],
        where:{
          id_tesis: null
        },
        order: {
          id_estudiante: 'DESC',
        },
      });
      return Data;
    } catch (e) {
      throw new RpcException(e);
    }
  }


  async GetAllEstudiantesTesis(id:number) {
    try {
      const Data = await this.repository.find({
        where: {id_tesis:id,status:1},
        select: [
          'id_usuario',
          //'id_estudiante',
          'id_tesis',
        ],
        order: {
          id_estudiante: 'DESC',
        },
      });
      if(Data.length == 0){
        return {message:'No hay estudiantes en esta tesis'}
      }
      return Data
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async Get(id: number) {
    try {
      return await this.repository.findOne({
        where: { id_estudiante: id, status: 1 },
        select: [
          'id_usuario',
          'id_estudiante',
          'id_tesis',
          'sexo',
          'genero',
          'estado_civil',
          'pais',
          'provincia',
          'ciudad',
          'parroquia',
          'direccion',
          'numero_hijos',
          'tipo_colegio',
        ],
      });
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async GetbyUser(id: number) {
    try {
      return await this.repository.findOne({
        where: { id_usuario: id, status: 1 },
        select: [
          'id_usuario',
          'id_estudiante',
          'id_tesis',
          'sexo',
          'genero',
          'estado_civil',
          'pais',
          'provincia',
          'ciudad',
          'parroquia',
          'direccion',
          'numero_hijos',
          'tipo_colegio',
        ],
      });
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async update(id: number, ChangeData: estudianteUpdateDTO) {
    try {
      const ExistData = await this.repository.findOne({
        where: { id_estudiante: id, status: 1 },
      });
      if (!ExistData) {
        return {};
      }
      return await this.repository.update(
        { id_estudiante: id },
        { ...ChangeData, updated_at: new Date() },
      );
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async delete(id) {
    try {
      const Exist = this.repository.findOne({
        where: { id_estudiante: id, status: 1 },
      });
      if (!Exist) {
        return { message: 'Dato no encontrado o ya eliminado' };
      }
      return this.repository.update(
        { id_estudiante: id },
        { deleted_at: new Date(), status: 0 },
      );
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async restore(id) {
    try {
      const Exist = this.repository.findOne({
        where: { id_estudiante: id, status: 0 },
      });
      if (!Exist) {
        return { message: 'Dato no encontrado o ya restaurado' };
      }
      return this.repository.update(
        { id_estudiante: id },
        { deleted_at: null, status: 1 },
      );
    } catch (e) {
      throw new RpcException(e);
    }
  }
}
