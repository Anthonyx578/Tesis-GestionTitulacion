import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { usuario } from 'src/entitys/usuario.entity';
import { PaginationDto } from 'src/pagination/PaginationDTO';
import { ILike, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsuarioUpdateDTO } from 'src/entitys/DTO/usuario.Update.DTO';
import { rol } from 'src/entitys/rol.entity';
import { RolService } from 'src/rol/rol.service';
import { CarreraService } from 'src/carrera/carrera.service';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(usuario) private repository: Repository<usuario>,
    private readonly rolService: RolService,
    private readonly carreraService: CarreraService,
  ) {}

  async Create(Usuario: UsuarioUpdateDTO) {
    try {
      const { contrasena, ...OtherData } = Usuario;
      const hashedCont = await this.hashPassword(contrasena);
      const NewCarrera = {
        ...OtherData,
        contrasena: hashedCont,
        created_at: new Date(),
      };
      return await this.repository.save(NewCarrera);
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async GetAll(Pagination: PaginationDto) {
    try {
      const { page, limit } = Pagination;

      const TotalData = await this.repository.count({
        where: { status: 1 },
      });
      const TotalPages = Math.ceil(TotalData / limit);

      const data = await this.repository.find({
        where: { status: 1 },
        select: [
          'id_usuario',
          'nombre_usuario',
          'nombres',
          'apellidos',
          'telefono',
          'correo',
          'fecha_nacimiento',
          'id_rol',
          'id_carrera',
          'status',
        ],
        skip: (page - 1) * limit,
        take: limit,
        order: {
          id_usuario: 'DESC',
        },
      });
      /*
            data.map((data)=>{
                data.id_rol
            })
            */
      return {
        data,
        meta: { TotalPages: TotalPages, CurrentPage: page, DataCount: limit },
      };
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async GetAllByRol(
    Pagination: PaginationDto,
    Rol: number,
    searchLike: string,
  ) {
    try {
      const { page, limit } = Pagination;
      const TotalData = await this.repository.count({
        where: { status: 1, id_rol: Rol },
      });
      const TotalPages = Math.ceil(TotalData / limit);

      const data = await this.repository.find({
        where: {
          status: 1,
          id_rol: Rol,
          //Hacer Pruebas, porque no da datos si pongo mas de uno
          nombre_usuario: ILike(`%${searchLike}%`),
          /*nombres: ILike(`%${searchLike}%`),
          apellidos: ILike(`%${searchLike}%`),
          correo: ILike(`%${searchLike}%`),*/
        },
        select: [
          'id_usuario',
          'nombre_usuario',
          'nombres',
          'apellidos',
          'telefono',
          'correo',
          'fecha_nacimiento',
          'id_rol',
          'id_carrera',
          'status',
        ],
        skip: (page - 1) * limit,
        take: limit,
        order: {
          id_usuario: 'DESC',
        },
      });
      const MappedData = await this.MappearProfesor(data);
      return {
        Data: MappedData,
        meta: {
          TotalPages: TotalPages,
          CurrentPage: page,
          DataCount: limit,
          TotalData: TotalData,
        },
      };
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async MappearProfesor(data:usuario[]){
    const MappedData = await Promise.all(
      data.map(async (data) => {
        const rolData = await this.rolService.Get(data.id_rol);
        const CarreraData = await this.carreraService.Get(data.id_carrera);
        return { ...data, ...rolData, ...CarreraData };
      }),
    );
    return MappedData
  }
  
  async Get(id: number) {
    try {
      const Find = await this.repository.findOne({
        where: { id_usuario: id },
        select: [
          'id_usuario',
          'nombre_usuario',
          'nombres',
          'apellidos',
          'telefono',
          'correo',
          'fecha_nacimiento',
          'id_rol',
          'id_carrera',
        ],
      });
      if (!Find) {
        return null;
      }
      return Find;
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async update(id: number, ChangeData: UsuarioUpdateDTO) {
    try {
      const ExistData = await this.repository.findOne({
        where: { id_usuario: id, status: 1 },
      });
      if (!ExistData) {
        return {};
      }
      return await this.repository.update(
        { id_usuario: id },
        { ...ChangeData, updated_at: new Date() },
      );
    } catch (e) {
      throw new RpcException(e);
    }
  }
  A;

  async delete(id) {
    try {
      const Exist = this.repository.findOne({
        where: { id_usuario: id, status: 1 },
      });
      if (!Exist) {
        return { message: 'Dato no encontrado o ya eliminado' };
      }
      return this.repository.update(
        { id_usuario: id },
        { deleted_at: new Date(), status: 0 },
      );
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async restore(id) {
    try {
      const Exist = this.repository.findOne({
        where: { id_usuario: id, status: 0 },
      });
      if (!Exist) {
        return { message: 'Dato no encontrado o ya restaurado' };
      }
      return this.repository.update(
        { id_usuario: id },
        { deleted_at: null, status: 1 },
      );
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async FindbyUser(nombre_usuario: string) {
    return await this.repository.findOne({
      where: { nombre_usuario: nombre_usuario, status: 1 },
      select: [
        'id_usuario',
        'nombre_usuario',
        'contrasena',
        'id_carrera',
        'id_rol',
      ],
    });
  }

  //Funciones Adicionales
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Número de rondas de salt para el hashing
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
