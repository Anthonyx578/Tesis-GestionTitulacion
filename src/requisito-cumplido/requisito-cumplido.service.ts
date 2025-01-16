import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/pagination/PaginationDTO';
import { requisitoCumplido } from './Entitys/requisito-cumplido.entity';
import { Repository } from 'typeorm';
import { requisitoCumplidoDTO } from './Entitys/DTO/requisito-cumplido.DTO';
import { InjectRepository } from '@nestjs/typeorm';
import { RequisitoService } from 'src/requisito/requisito.service';
import { throwIfEmpty } from 'rxjs';

@Injectable()
export class RequisitoCumplidoService {
  constructor(
    @InjectRepository(requisitoCumplido)
    private readonly repository: Repository<requisitoCumplido>,
    private readonly RequisitoService: RequisitoService,
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

      const Data = await this.repository.find({
        where: { status: 1 },
        select: ['id', 'id_estudiante', 'id_requisito', 'estado'],
        skip: (page - 1) * limit,
        take: limit,
        order: {
          id: 'DESC',
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


  async GetRequisitosEstudiante (id:number){
    try {
      const Requisitos = await this.repository.find({where:{id_estudiante:id,status:1},select:['id_requisito','estado']})
      return Requisitos;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  async contarRequisitos(idEstudiante:number){
    const requisitos =await this.repository.count({where:{id_estudiante:idEstudiante,status:1}})
    const comuplidos = await this.repository.count({where:{id_estudiante:idEstudiante,status:1,estado:1}})
    return {Cumplidos:`${comuplidos}/${requisitos}`}
  }

  async GetAllByEstudiante(Pagination: PaginationDto, Estudiante: number) {
    try {
      const { page, limit } = Pagination;

      const TotalData = await this.repository.count({
        where: { status: 1 },
      });
      const TotalPages = Math.ceil(TotalData / limit);

      const Requisitos = await this.repository.find({
        where: { status: 1, id_estudiante: Estudiante },
        select: ['id', 'id_estudiante', 'id_requisito', 'estado'],
        skip: (page - 1) * limit,
        take: limit,
        order: {
          id: 'DESC',
        },
      });
      const Data = await Promise.all(
        Requisitos.map(async (item) => {
          const Requisito = await this.RequisitoService.Get(item.id_requisito);
          return { ...item, ...Requisito };
        }),
      );
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
        select: ['id', 'id_estudiante', 'id_requisito', 'estado'],
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

  async deleteAllRequisitos(id_estudiante: number) {
    try {
      const Requisitos:any[] = await this.repository.find({
        where: { id_estudiante: id_estudiante, status: 1 },
        select: ['id'],
      });
      if(Requisitos.length === 0){
        throw new RpcException('No existen reqisitos para ese estudiante')
      }
      await Requisitos.map(
        async (requisitos)=>{
          try {
            await this.delete(requisitos.id)
            return 'Requisito Eliminado'
          } catch (error) {
            return 'Error al eliminar el requisito '+requisitos.id
          }
          
        }
      )
      return 'Operacion Realizada'
    } catch (error) {
      throw new RpcException(error);
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
