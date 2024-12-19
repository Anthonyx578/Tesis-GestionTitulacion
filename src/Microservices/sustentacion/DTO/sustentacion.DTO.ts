import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString } from "class-validator";

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
  @IsDate()
  @ApiProperty()
  fecha_sustentacion: Date;
  @ApiProperty()
  @IsString()
  estado_sustentacion: string;
  @ApiProperty()
  @IsString()
  periodo_academico: string;
}
