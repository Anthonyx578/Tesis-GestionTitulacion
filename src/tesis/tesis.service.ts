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
        where: {},
        select: [
          'id_tesis',
          'titulo',
          'documento',
          'fecha',
          'id_docente_tutor',
          'status',
          'periodo'
        ],
        skip: (page - 1) * limit,
        take: limit,
        order: {
          id_tesis: 'DESC',
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

  async GetAllByPeriod(Periodo:string) {
    try {
      const Data = await this.repository.find({
        where: { periodo:Periodo,status: 1 },
        select: [
          'id_tesis',
          'titulo',
          'documento',
          'fecha',
          'id_docente_tutor',
          'status',
          'periodo'
        ],
        order: {
          id_tesis: 'DESC',
        },
      });
      return Data
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async GetAllLike(Pagination: PaginationDto, Like: string) {
    try {
      const { page, limit } = Pagination;

      const TotalData = await this.repository.count({
        where: { status: 1 },
      });
      const TotalPages = Math.ceil(TotalData / limit);

      const Data = await this.repository.find({
        where: { status: 1, titulo: ILike(`%${Like}%`) },
        select: [
          'id_tesis',
          'titulo',
          'documento',
          'fecha',
          'id_docente_tutor',
          'periodo'
        ],
        skip: (page - 1) * limit,
        take: limit,
        order: {
          id_tesis: 'DESC',
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


  async GetAllByDocenteID(Pagination: PaginationDto, idDocente:number) {
    try {
      const { page, limit } = Pagination;

      const TotalData = await this.repository.count({
        where: {id_docente_tutor:idDocente, status: 1 },
      });
      const TotalPages = Math.ceil(TotalData / limit);

      const Data = await this.repository.find({
        where: { id_docente_tutor:idDocente,status: 1},
        select: [
          'id_tesis',
          'titulo',
          'documento',
          'fecha',
          'id_docente_tutor',
          'periodo'
        ],
        skip: (page - 1) * limit,
        take: limit,
        order: {
          id_tesis: 'DESC',
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
  async Get(id: number) {
    try {
      return await this.repository.findOne({
        where: { id_tesis: id, status: 1 },
        select: [
          'id_tesis',
          'titulo',
          'documento',
          'fecha',
          'id_docente_tutor',
          'periodo'
        ],
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

  async savePdf(payload: { idTesis: number; filePath: string }) {
    try {
      const { idTesis, filePath } = payload;

      // Buscar la tesis por ID
      const tesis = await this.repository.findOne({ where: { id_tesis: idTesis } });
      if (!tesis) {
        throw new Error('Tesis no encontrada');
      }

      // Actualizar la ruta del archivo
      tesis.documento = filePath;
      await this.repository.save(tesis);

      return { message: 'Ruta del archivo guardada correctamente', filePath };
    } catch (error) {
      throw new Error(`Error al guardar la ruta: ${error.message}`);
    }
  }

  async getTesisFilePath(idTesis:number){
    return await this.repository.findOne({where:{id_tesis:idTesis,},select:['documento']})
  }

  // Función para obtener la ruta del archivo desde la base de datos
  async getRutaArchivoFromDb(idTesis: number): Promise<string | null> {
    // Aquí haces la consulta a la base de datos para obtener el nombre del archivo basado en el ID de tesis
    const resultado = await this.repository.findOne({
      where: { id_tesis: idTesis },
      select: ['documento'], // Campo donde se guarda la ruta
    });

    return resultado ? resultado.documento : null;
  }

 
}
