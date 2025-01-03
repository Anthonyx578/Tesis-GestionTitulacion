import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Query,
  Get,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { firstValueFrom } from 'rxjs';
import {
  SuccessResponse,
  BadRequestResponse,
  FailResponse,
} from 'src/Response/Responses';
import { ApiBody, ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';
import { ExeptValidator } from 'src/ExceptionValidator/ExceptionValidator';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

// Asume que ya tienes estas utilidades

@Controller('files')
export class FilesController {
  constructor(@Inject('NAT_Service') private readonly client: ClientProxy) {}

  @Post('upload-pdf')
  @UseInterceptors(FileInterceptor('file'))
  @ApiTags('Documentos')
  @ApiBody({
    description: 'Subir un archivo PDF',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        folderName: {
          type: 'string',
          description: 'Nombre de la carpeta donde se guardará el archivo',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  async uploadPdf(
    @UploadedFile() file: Express.Multer.File,
    @Body('folderName') folderName: string,
    @Query('id_tesis') idTesis: number,
  ) {
    try {
      if (!file || file.mimetype !== 'application/pdf') {
        return BadRequestResponse('Por favor, sube un archivo PDF válido');
      }

      if (!folderName) {
        return BadRequestResponse('El nombre de la carpeta es obligatorio');
      }

      // Verificar y ajustar la carpeta base
      const baseFolder =
        folderName === 'TesisDOC'
          ? folderName
          : path.join('TesisDOC', folderName);
      if (!fs.existsSync(baseFolder)) {
        fs.mkdirSync(baseFolder, { recursive: true });
      }

      // Generar un nombre único para el archivo
      const uniqueFileName = `${idTesis}_${file.originalname}`;
      const filePath = path.join(baseFolder, uniqueFileName);

      // Guardar el archivo en el sistema de archivos
      fs.writeFileSync(filePath, file.buffer);

      // Llamar al microservicio para guardar la ruta en la base de datos
      const relativePath = path.relative('TesisDOC', filePath); // Ruta relativa dentro de TesisDOC
      const payload = {
        idTesis,
        filePath: path.join('TesisDOC', relativePath), // Prefijar con TesisDOC
      };

      const response = await firstValueFrom(
        this.client.send({ cmd: 'SaveTesis' }, payload),
      );

      // Asegurar que la respuesta contiene la ruta completa
      const result = {
        ...response,
        filePath: payload.filePath, // Garantizar que incluye el prefijo TesisDOC
      };

      return SuccessResponse(result);
    } catch (error) {
      console.error('Error al cargar el archivo:', error);
      return FailResponse(ExeptValidator(error));
    }
  }

  @Get('download')
  @ApiTags('Documentos')
  async downloadFile(@Query('id_tesis') idTesis: number, @Res() res: Response) {
    try {
      if (!idTesis) {
        throw new HttpException('El ID de tesis es obligatorio', HttpStatus.BAD_REQUEST);
      }

      // Solicitar la ruta del archivo al microservicio
      const filePathResponse = await firstValueFrom(
        this.client.send({ cmd: 'GetTesisFilePath' }, { idTesis }),
      );

      if (!filePathResponse) {
        throw new HttpException('No se encontró la ruta del archivo', HttpStatus.NOT_FOUND);
      }
      console.log('Paso el FilePathRepsonse')
      const fullPath = path.join(filePathResponse.documento);
      // Verificar si el archivo existe
      if (!fs.existsSync(fullPath)) {
        throw new HttpException('El archivo no existe en el servidor', HttpStatus.NOT_FOUND);
      }

      // Obtener el nombre del archivo
      const fileName = path.basename(fullPath);
      console.log(fileName)
      // Configurar encabezados y enviar el archivo
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      res.setHeader('Content-Type', 'application/pdf');

      const fileStream = fs.createReadStream(fullPath);
      fileStream.pipe(res);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Ocurrió un error interno al intentar descargar el archivo',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
