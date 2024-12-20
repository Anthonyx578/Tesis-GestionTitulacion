import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsEmail, IsNumber, IsString } from "class-validator"


export class Usuario{
    @ApiProperty()
    @IsNumber()
    id_usuario:number
    
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
    @IsDate()
    fecha_nacimiento:Date

    @ApiProperty()
    @IsNumber()
    id_rol:number

    @ApiProperty()
    @IsNumber()
    id_carrera:number
}