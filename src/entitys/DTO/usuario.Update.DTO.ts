import { IsDate, IsEmail, IsString } from "class-validator";

export class UsuarioUpdateDTO{
    nombre_usuario:string

    nombres:string

    contrasena:string
    
    apellidos:string

    telefono_string

    @IsEmail()
    correo:string

    @IsString()
    fecha_nacimiento:string

    id_rol:number

    id_carrera:number
}