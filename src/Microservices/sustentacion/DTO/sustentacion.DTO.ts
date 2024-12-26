import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString, IsOptional } from "class-validator";

export class sustentacionDTO {
  @ApiProperty()
  @IsNumber()
  id_tesis: number;
  
  @ApiProperty()
  @IsNumber()
  id_carrera: number;
  
  @ApiProperty()
  @IsString()
  tipo: string;
  
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  fecha_sustentacion: Date;
  
  @ApiProperty()
  @IsString()
  estado_sustentacion: string;
  
  @ApiProperty()
  @IsString()
  periodo_academico: string;
  
  @ApiProperty()
  @IsString()
  aula: string;  // Asegúrate de incluir este campo en la clase DTO.
}


