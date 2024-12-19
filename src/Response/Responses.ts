import { HttpException, HttpStatus, Res } from "@nestjs/common";
import { response } from "express";

export function FailResponse(Error:any = null){
    throw new HttpException({message:'Error en la operacion',error:Error},HttpStatus.INTERNAL_SERVER_ERROR)
}

export function FailServiceResponse(Error:any = null){
    throw new HttpException({message:'Se produjo un problema con los servicios',error:Error},HttpStatus.INTERNAL_SERVER_ERROR)
}

export function PaginatedSuccessResponse(Data:any = {}){
    return {message:'Operacion realizada con exito',...Data}
}

export function PaginatedMappedResponse(Data:any = {}){
    return {message:'Operacion realizada con exito',Data}
}

export function BadRequestResponse(Mesagge:string = 'Operacion invalida'){
    return {message:Mesagge }
}

export function SuccessResponse(Data:any = {}){
    return {message:'Operacion realizada con exito', Data};
}