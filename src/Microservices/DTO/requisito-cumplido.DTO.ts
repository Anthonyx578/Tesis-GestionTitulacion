import { ApiProperty } from "@nestjs/swagger";

export class requisitoCumplidoDTO {
  @ApiProperty()
  id_requisito: number;
  @ApiProperty()
  id_estudiante:number;
  @ApiProperty({example:1})
  estado: number;
}
