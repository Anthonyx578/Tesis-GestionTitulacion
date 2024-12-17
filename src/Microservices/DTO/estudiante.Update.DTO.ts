import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNumber, IsString } from "class-validator"

export class EstudianteUpdateDTO{
    @ApiProperty()
    @IsNumber()
    id_tesis:number
    @ApiProperty()
    @IsString()
    sexo:string
    @ApiProperty()
    @IsString()
    estado_civil:string
    @ApiProperty()
    @IsString()
    genero:string
    @ApiProperty()
    @IsString()
    tipo_colegio:string
    @ApiProperty()
    @IsNumber()
    numero_hijos:number
    @ApiProperty()
    @IsString()
    pais:string
    @ApiProperty()
    @IsString()
    provincia:string
    @ApiProperty()
    @IsString()
    ciudad:string
    @ApiProperty()
    @IsString()
    parroquia:string
    @ApiProperty()
    @IsString()
    direccion:string
}