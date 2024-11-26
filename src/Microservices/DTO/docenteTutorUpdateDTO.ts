import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";


export class docenteTutorUpdateDTO{
    @ApiProperty()
    @IsNumber()
    id_usuario:number
}