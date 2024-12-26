import { IsDate, IsNumber, IsString, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class sustentacionDTO {
  @IsNumber()
  id_tesis: number;
  
  @IsNumber()
  id_carrera: number;
  
  @IsString()
  tipo: string;
  
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fecha_sustentacion: Date;
  
  @IsString()
  estado_sustentacion: string;
  
  @IsString()
  periodo_academico: string;

  @IsString()
  aula: string;
}
