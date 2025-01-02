import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Query,
  Get,
  Res,
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

      const payload = {
        buffer: file.buffer.toString('base64'), // Convertir buffer a string base64
        fileName: file.originalname,
        folderName,
        idTesis,
      };

      const response = await firstValueFrom(
        this.client.send({ cmd: 'SaveTesis' }, payload),
      );

      return SuccessResponse(response);
    } catch (error) {
      console.log();
      return FailResponse(ExeptValidator(error));
    }
  }

  @Get('download-pdf')
  async downloadPdf(@Query('id_tesis') idTesis: number, @Res() res: Response) {
    try {
      // Llamamos al microservicio para obtener el stream del archivo
      const response = await firstValueFrom(
        this.client.send({ cmd: 'DownloadTesis' }, idTesis)
      );
  
      // Validación de la respuesta del microservicio
      if (response && response.error) {
        return res.status(404).send(response.error); // Si hay un error, devolverlo
      }
  
      // Verificamos que la respuesta sea un stream
      if (response && response.pipe) {
        // Si la respuesta es un stream, lo pipeteamos directamente
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="tesis.pdf"');
  
        // Usamos el pipe para enviar el archivo al cliente
        response.pipe(res);
  
        // Aseguramos que el stream se cierre correctamente al finalizar
        response.on('end', () => {
          console.log('Archivo enviado correctamente');
        });
  
        response.on('error', (err) => {
          console.error('Error en el stream:', err);
          res.status(500).send('Error al procesar el archivo');
        });
  
      } else {
        return res.status(500).send('Error al procesar la solicitud en pipe');
      }
  
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      return res.status(500).send('Error al procesar la solicitud de error');
    }
  }
}
