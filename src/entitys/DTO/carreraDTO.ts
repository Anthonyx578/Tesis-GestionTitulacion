import { IsString } from "class-validator";

export class carreraDTO{
    @IsString()
    nombre_carrera:string
}