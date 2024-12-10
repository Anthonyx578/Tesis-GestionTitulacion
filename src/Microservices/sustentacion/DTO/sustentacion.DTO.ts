import { ApiProperty } from "@nestjs/swagger";

export class sustentacionDTO {
  @ApiProperty()
  id_tesis: number;
  @ApiProperty()
  id_carrera: number;
  @ApiProperty()
  tipo: string;
  @ApiProperty()
  fecha_sustentacion: Date;
  @ApiProperty()
  estado_sustentacion: string;
  @ApiProperty()
  periodo_academico: string;
}
