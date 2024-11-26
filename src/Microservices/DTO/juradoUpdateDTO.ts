import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class juradoUpdateDTO{
    @ApiProperty()
    @IsNumber()
    id_usuario:number
}