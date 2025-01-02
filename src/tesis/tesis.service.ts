import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tesis } from './Entitys/tesis.Entity';
import { ILike, Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/pagination/PaginationDTO';
import { tesisDTO } from './Entitys/DTO/tesis.DTO';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

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
        select: [
          'id_tesis',
          'titulo',
          'documento',
          'fecha',
          'id_docente_tutor',
          'status',
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

  async saveTesisPdf(
    buffer: string,
    fileName: string,
    folderName: string,
    idTesis: number,
  ) {
    try {
      // Usamos solo la carpeta "TesisDoc" sin crear una subcarpeta adicional
      const folderPath = path.join('TesisDoc'); // Usar la ruta relativa

      // Crear la carpeta "TesisDoc" si no existe
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      // Generar un nombre único para el archivo usando id_tesis y el nombre del archivo
      const uniqueFileName = `${idTesis}_${fileName}`;
      const filePath = path.join(folderPath, uniqueFileName); // Ruta relativa del archivo

      // Convertir el buffer a un archivo PDF
      fs.writeFileSync(filePath, Buffer.from(buffer, 'base64'));

      // Actualizar la base de datos con la ruta relativa del archivo
      const tesis = await this.repository.findOne({
        where: { id_tesis: idTesis },
      });
      if (!tesis) {
        throw new Error('Tesis no encontrada');
      }

      tesis.documento = path.join('TesisDoc', uniqueFileName); // Guardamos la ruta relativa en el campo documento
      await this.repository.save(tesis);

      return { filePath, documento: tesis.documento };
    } catch (error) {
      throw new Error(`Error al guardar la tesis: ${error.message}`);
    }
  }

  async downloadTesis(idTesis: number): Promise<string | null> {
    try {
      console.log(`ID Tesis recibido en el servicio: ${idTesis}`);
  
      const rutaArchivoDb = await this.getRutaArchivoFromDb(idTesis); // Suponiendo que tienes esta función para obtener la ruta del archivo
      if (!rutaArchivoDb) {
        console.log('Archivo no encontrado en la base de datos');
        return null;
      }
  
      // Usar directamente la ruta proporcionada por la base de datos
      const filePath = path.join(__dirname, '../../', rutaArchivoDb); // Aquí no agregamos 'TesisDoc' nuevamente
      console.log(`Ruta del archivo: ${filePath}`); // Verificación de la ruta
  
      // Comprobar si el archivo existe
      if (!fs.existsSync(filePath)) {
        console.log('Archivo no encontrado en la ruta:', filePath);
        return null;
      }
  
      return filePath; // Retornar la ruta del archivo
    } catch (error) {
      console.error('Error al descargar la tesis:', error);
      return null;
    }
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
