import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class requisitoDTO{
    @ApiProperty()
    @IsString()
    documento:string
}