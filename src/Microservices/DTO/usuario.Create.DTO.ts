import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UsuarioCreateDTO{
    @ApiProperty()
    @IsString()
    nombre_usuario:string
    @ApiProperty()
    @IsString()
    contrasena:string
}