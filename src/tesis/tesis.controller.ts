import { Controller, Res } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TesisService } from './tesis.service';
import { tesisDTO } from './Entitys/DTO/tesis.DTO';
import { PaginationDto } from 'src/pagination/PaginationDTO';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('tesis')
export class TesisController {
  constructor(private readonly Services: TesisService) {}
  @MessagePattern({ cmd: 'CreateTesis' })
  async Create(Tesis: tesisDTO) {
    return await this.Services.Create(Tesis);
  }

  @MessagePattern({ cmd: 'GetAllTesis' })
  async GetAll(Pagination: PaginationDto) {
    return await this.Services.GetAll(Pagination);
  }

  @MessagePattern({ cmd: 'GetAllLikeTesis' })
  async GetAllLike(data: { Pagination: PaginationDto; Like: string }) {
    const { Pagination, Like } = data;
    return await this.Services.GetAllLike(Pagination, Like);
  }

  @MessagePattern({ cmd: 'GetTesis' })
  async Get(id: number) {
    return await this.Services.Get(id);
  }

  @MessagePattern({ cmd: 'UpdateTesis' })
  async Update(data: { id: number; TesisData: tesisDTO }) {
    const { id, TesisData } = data;
    return await this.Services.update(id, TesisData);
  }

  @MessagePattern({ cmd: 'DeleteTesis' })
  async Delete(id: number) {
    return await this.Services.delete(id);
  }

  @MessagePattern({ cmd: 'RestoreTesis' })
  async Restore(id: number) {
    return await this.Services.restore(id);
  }

  @MessagePattern({ cmd: 'SaveTesis' })
  async savePdf(payload: {
    buffer: string;
    fileName: string;
    folderName: string;
    idTesis: number;
  }) {
    try {
      const { buffer, fileName, folderName, idTesis } = payload;

      // Llamamos al servicio para guardar el archivo y actualizar la base de datos
      const result = await this.Services.saveTesisPdf(
        buffer,
        fileName,
        folderName,
        idTesis,
      );
      return result;
    } catch (error) {
      return { message: 'Error al guardar el archivo', error: error.message };
    }
  }

  @MessagePattern({ cmd: 'DownloadTesis' })
  async downloadTesis(idTesis: number): Promise<any> {
    console.log(`ID Tesis recibido en el microservicio: ${idTesis}`);

    const filePath = await this.Services.downloadTesis(idTesis);
    if (!filePath) {
      return { error: 'Archivo no encontrado' };
    }

    // Crear el stream del archivo
    const fileStream = fs.createReadStream(filePath);
    console.log(fileStream)
    return fileStream; // Retorna el stream del archivo
  }
}
