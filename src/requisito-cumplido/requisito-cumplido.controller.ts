import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RequisitoCumplidoService } from './requisito-cumplido.service';
import { requisitoCumplidoDTO } from './Entitys/DTO/requisito-cumplido.DTO';
import { PaginationDto } from 'src/pagination/PaginationDTO';

@Controller('requisito-cumplido')
export class RequisitoCumplidoController {
  constructor(private readonly Services: RequisitoCumplidoService) {}
  @MessagePattern({ cmd: 'CreateRequisitoCumplido' })
  async Create(requisitoCumplido: requisitoCumplidoDTO) {
    return await this.Services.Create(requisitoCumplido);
  }

  @MessagePattern({ cmd: 'GetAllRequisitoCumplido' })
  async GetAll(Pagination: PaginationDto) {
    return await this.Services.GetAll(Pagination);
  }

  @MessagePattern({ cmd: 'GetRequisitoCumplido' })
  async Get(id: number) {
    return await this.Services.Get(id);
  }

  @MessagePattern({ cmd: 'GetAllByEstudianteRequisitoCumplido' })
  async GetAllByEstudiante(data: {
    Pagination: PaginationDto;
    id_estudiante: number;
  }) {
    const { Pagination, id_estudiante } = data;
    return await this.Services.GetAllByEstudiante(Pagination, id_estudiante);
  }

  @MessagePattern({ cmd: 'ContarRequisito' })
  async ContarRequisitos(id: number) {
    return await this.Services.contarRequisitos(id);
  }

  @MessagePattern({ cmd: 'GetRequisitoCumplidoEstudiante' })
  async GetParaEstudiante(id: number) {
    return await this.Services.GetRequisitosEstudiante(id);
  }

  @MessagePattern({ cmd: 'UpdateRequisitoCumplido' })
  async Update(data: {
    id: number;
    RequisitoCumplidoData: requisitoCumplidoDTO;
  }) {
    const { id, RequisitoCumplidoData } = data;
    return await this.Services.update(id, RequisitoCumplidoData);
  }

  @MessagePattern({ cmd: 'DeleteAllRequisitoCumplido' })
  async DeleteAllRequisitos(id_estudiante: number) {
    return await this.Services.deleteAllRequisitos(id_estudiante);
  }

  @MessagePattern({ cmd: 'DeleteRequisitoCumplido' })
  async Delete(id: number) {
    return await this.Services.delete(id);
  }

  @MessagePattern({ cmd: 'RestoreRequisitoCumplido' })
  async Restore(id: number) {
    return await this.Services.restore(id);
  }
}
