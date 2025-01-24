import { Controller } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { MessagePattern } from '@nestjs/microservices';
import { UsuarioCreateDTO } from 'src/entitys/DTO/usuario.Create.DTO';
import { PaginationDto } from 'src/pagination/PaginationDTO';
import { UsuarioUpdateDTO } from 'src/entitys/DTO/usuario.Update.DTO';
import { Like } from 'typeorm';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly Services: UsuarioService) {}

  @MessagePattern({ cmd: 'CreateUsuario' })
  async Create(Data: UsuarioUpdateDTO) {
    return await this.Services.Create(Data);
  }
  @MessagePattern({ cmd: 'GetAllUsuario' })
  async GetAll(Pagination: PaginationDto) {
    return await this.Services.GetAll(Pagination);
  }

  @MessagePattern({ cmd: 'GetAllUsuarioLike' })
  async GetAllLike(Data:{Pagination: PaginationDto,Like:string}) {
    const {Pagination,Like} = Data
    return await this.Services.GetAllLike(Pagination,Like);
  }

  @MessagePattern({ cmd: 'GetAllUsuarioByRol' })
  async GetAllByRol(data:{Pagination: PaginationDto,id_rol:number,searchLike}) {
    const {Pagination,id_rol,searchLike} = data
    return await this.Services.GetAllByRol(Pagination, id_rol,searchLike);
  }

  @MessagePattern({ cmd: 'GetAllUsuarioByRolReporte' })
  async GetAllByRolReporte(data:{id_rol:number}) {
    const {id_rol} = data
    return await this.Services.GetAllByRolReportaje(id_rol);
  }

  @MessagePattern({ cmd: 'GetUsuario' })
  async Get(id: number) {
    return await this.Services.Get(id);
  }

  @MessagePattern({ cmd: 'GetUsuarioNames' })
  async GetNames(id: number) {
    return await this.Services.GetNames(id);
  }

  @MessagePattern({ cmd: 'UpdateUsuario' })
  async Update(data: { id: number; UsuarioData: UsuarioUpdateDTO }) {
    const { id, UsuarioData } = data;
    return await this.Services.update(id, UsuarioData);
  }

  @MessagePattern({ cmd: 'DeleteUsuario' })
  async Delete(id: number) {
    return await this.Services.delete(id);
  }

  @MessagePattern({ cmd: 'RestoreUsuario' })
  async Restore(id: number) {
    return await this.Services.restore(id);
  }
}
