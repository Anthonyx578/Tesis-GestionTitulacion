import { IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UsuarioUpdateDTO {
    @IsOptional()
    nombre_usuario?: string;

    @IsOptional()
    nombres?: string;

    @IsOptional()
    contrasena?: string;

    @IsOptional()
    apellidos?: string;

    @IsOptional()
    telefono?: string;

    @IsOptional()
    correo?: string;

    @IsOptional()
    @Type(() => Date) // Transformar a un objeto Date
    @IsDate() // Validar que es una fecha
    fecha_nacimiento?: Date;

    @IsOptional()
    id_rol?: number;

    @IsOptional()
    id_carrera?: number;
}
