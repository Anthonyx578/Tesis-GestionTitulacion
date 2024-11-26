import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNumber } from "class-validator"

export class EstudianteUpdateDTO{
    @ApiProperty()
    @IsNumber()
    id_tesis:number
    @ApiProperty()
    @IsNumber()
    id_usuario:number
}