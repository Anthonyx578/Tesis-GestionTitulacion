import { IsString } from "class-validator";

export class rolDTO{
    @IsString()
    rol:string;
}