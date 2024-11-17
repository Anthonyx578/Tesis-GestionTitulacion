import { IsString } from "class-validator";

export class UsuarioCreateDTO{
    @IsString()
    nombre_usuario:string
    @IsString()
    contrasena:string
}