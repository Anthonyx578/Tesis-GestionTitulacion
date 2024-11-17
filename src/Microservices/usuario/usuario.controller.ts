import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { UsuarioCreateDTO } from '../DTO/usuario.Create.DTO';
import { FailResponse, PaginatedSuccessResponse, SuccessResponse } from 'src/Response/Responses';
import { PaginationDto } from 'src/Pagination/PaginationDTO';
import { UsuarioUpdateDTO } from '../DTO/usuario.Update.DTO';

@Controller('usuario')
export class UsuarioController {
    constructor(@Inject('NAT_Service') private readonly client:ClientProxy){}

    @ApiTags('Usuario')
    @Post()
    async Create (@Body()Usuario:UsuarioCreateDTO){
      try{
        return await this.client.send(
          { cmd: 'CreateUsuario' },
          Usuario,).toPromise();
      }  
      catch(error){
        return FailResponse(error)
      }
    }

    @ApiTags('Usuario')
    @Get()
    async GetAll(@Query()Pagination:PaginationDto){
      try{
        const data = await this.client.send(
          {cmd:'GetAllUsuario'},
          Pagination
        ).toPromise();
        return PaginatedSuccessResponse(data);
      }
      catch(e){
        return FailResponse(e)
      }
    }

    @ApiTags('Usuario')
    @Get(':id')
    async Get(@Param('id')id:number){
      try{
        const data = await this.client.send(
          {cmd:'GetUsuario'},
          id
        ).toPromise();
        return SuccessResponse(data);
      }
      catch(e){
        return FailResponse(e)
      }
    }
    @ApiTags('Usuario')
    @Put(':id')
    async Update(@Param('id')id:number,@Body()UsuarioData:UsuarioUpdateDTO){
      try{
        const data = await this.client.send(
          {cmd:'UpdateUsuario'},
          {id,UsuarioData}
        ).toPromise();
        return SuccessResponse(data);
      }
      catch(e){
        return FailResponse(e)
      }
    }

   
    @ApiTags('Usuario')
    @Delete(':id')
    async Delete(@Param('id')id:number){
      try {
        const data = await this.client.send(
          {cmd:'DeleteUsuario'},
          id).toPromise();
        return SuccessResponse(data)
      } catch (e) {
        return FailResponse(e)
      }
    }

    @ApiTags('Usuario')
    @Put(':id/restore')
    async Restore (@Param('id')id:number){
      try {
        const data = await this.client.send(
          {cmd:'RestoreUsuario'},
          id).toPromise();
        return SuccessResponse(data)
      } catch (error) {
        return FailResponse(error)
      }
    }
}

