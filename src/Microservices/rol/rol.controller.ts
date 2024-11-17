import { Body, Controller, HttpException, HttpStatus, Inject, Post , Get , Put , Delete, Query, Param, UseGuards } from '@nestjs/common';
import { rolDTO } from '../DTO/rol.create';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { FailResponse, PaginatedSuccessResponse,SuccessResponse } from 'src/Response/Responses';
import { PaginationDto } from 'src/Pagination/PaginationDTO';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('rol')
export class RolController {
    constructor(
        @Inject('NAT_Service') private readonly client: ClientProxy,
    ) {}

    @ApiTags('Rol')
    @Post()
    async Create (@Body()Rol:rolDTO){
      try{
        return await this.client.send(
          { cmd: 'CreateRol' },
          Rol,).toPromise();
      }  
      catch(error){
        return FailResponse()
      }
    }

    
    @ApiTags('Rol')
    @Get()
    async GetAll(@Query()Pagination:PaginationDto){
      try{
        const data = await this.client.send(
          {cmd:'GetAllRol'},
          Pagination
        ).toPromise();
        return PaginatedSuccessResponse(data);
      }
      catch(e){
        return FailResponse(e)
      }
    }

    @ApiTags('Rol')
    @Get(':id')
    async Get(@Param('id')id:number){
      try{
        const data = await this.client.send(
          {cmd:'GetRol'},
          id
        ).toPromise();
        return SuccessResponse(data);
      }
      catch(e){
        return FailResponse(e)
      }
    }

    @ApiTags('Rol')
    @Put(':id')
    async Update(@Param('id')id:number,@Body()RolData:rolDTO){
      try{
        const data = await this.client.send(
          {cmd:'UpdateRol'},
          {id,RolData}
        ).toPromise();
        return SuccessResponse(data);
      }
      catch(e){
        return FailResponse(e)
      }
    }

    @ApiTags('Rol')
    @Delete(':id')
    async Delete(@Param('id')id:number){
      try {
        const data = await this.client.send(
          {cmd:'DeleteRol'},
          id).toPromise();
        return SuccessResponse(data)
      } catch (e) {
        return FailResponse(e)
      }
    }

    @ApiTags('Rol')
    @Put(':id/restore')
    async Restore (@Param('id')id:number){
      try {
        const data = await this.client.send(
          {cmd:'RestoreRol'},
          id).toPromise();
      } catch (error) {
        return FailResponse(error)
      }
    }
}
