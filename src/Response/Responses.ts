import { HttpException, HttpStatus } from "@nestjs/common";

export function FailResponse(Error:any = null){
    throw new HttpException({message:'Error en la operacion',error:Error},HttpStatus.INTERNAL_SERVER_ERROR)
}

export function PaginatedSuccessResponse(Data:any = {}){
    return {message:'Operacion realizada con exito',...Data}
}

export function SuccessResponse(Data:any = {}){
    return {message:'Operacion realizada con exito',Data}
}