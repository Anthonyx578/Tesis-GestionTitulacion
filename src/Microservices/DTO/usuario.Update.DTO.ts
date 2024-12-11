import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsNumber, IsString } from "class-validator";

export class UsuarioUpdateDTO{
    @ApiProperty()
    @IsString()
    nombre_usuario:string

    @ApiProperty()
    @IsString()
    contrasena:string

    @ApiProperty()
    @IsString()
    nombres:string

    @ApiProperty()
    @IsString()
    apellidos:string

    @ApiProperty()
    @IsString()
    telefono:string

    @ApiProperty()
    @IsEmail()
    correo:string

    @ApiProperty()
    @IsString()
    fecha_nacimiento:string

    @ApiProperty()
    @IsNumber()
    id_rol:number

    @ApiProperty()
    @IsNumber()
    id_carrera:number
}