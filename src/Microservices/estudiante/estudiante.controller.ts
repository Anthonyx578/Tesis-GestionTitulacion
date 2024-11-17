import { Controller, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FailResponse, SuccessResponse } from 'src/Response/Responses';

@Controller('estudiante')
export class EstudianteController {
    constructor(@Inject('NAT_Service') private readonly client:ClientProxy ){}

    @Post(':id_usuario')
    async Create(@Param('id_usuario')id_usuario:number){
        try {
            const Usuario = await this.client.send(
                {cmd:'CreateEstudiante'},
                id_usuario
            ).toPromise()
            return SuccessResponse(Usuario);    
        } catch (error) {
            return FailResponse(error)
        }
    }

    
}
