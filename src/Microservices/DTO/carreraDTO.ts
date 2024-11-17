import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class carreraDTO{
    @ApiProperty()
    @IsString()
    nombre_carrera:string
}