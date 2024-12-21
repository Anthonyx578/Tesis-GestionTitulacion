import { Controller } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { MessagePattern } from '@nestjs/microservices';
import { PaginationDto } from 'src/pagination/PaginationDTO';
import { estudianteUpdateDTO } from 'src/estudiante/Entitys/DTO/estudianteUpdateDTO';

@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly Services: EstudianteService) {}

  @MessagePattern({ cmd: 'CreateEstudiante' })
  async Create(id_usuario: number) {
    return await this.Services.Create(id_usuario);
  }

  @MessagePattern({ cmd: 'GetAllEstudiante' })
  async GetAll(Data:{Pagination: PaginationDto,Like:string}) {
    const {Pagination,Like} = Data
    return await this.Services.GetAll(Pagination,Like);
  }

  @MessagePattern({ cmd: 'GetEstudiante' })
  async Get(id: number) {
    return await this.Services.Get(id);
  }

  @MessagePattern({ cmd: 'GetEstudiantebyUser' })
  async GetbyUser(id: number) {
    return await this.Services.GetbyUser(id);
  }

  @MessagePattern({ cmd: 'UpdateEstudiante' })
  async Update(data: { id: number; EstudianteData: estudianteUpdateDTO }) {
    const { id, EstudianteData } = data;
    return await this.Services.update(id, EstudianteData);
  }

  @MessagePattern({ cmd: 'DeleteEstudiante' })
  async Delete(id: number) {
    return await this.Services.delete(id);
  }

  @MessagePattern({ cmd: 'RestoreEstudiante' })
  async Restore(id: number) {
    return await this.Services.restore(id);
  }
}
