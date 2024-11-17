import { ApiProperty } from "@nestjs/swagger";
import { isString } from "util";
import { IsString, IsNotEmpty } from 'class-validator';

export class rolDTO{
    @ApiProperty()
    @IsString()
    rol:string;
}