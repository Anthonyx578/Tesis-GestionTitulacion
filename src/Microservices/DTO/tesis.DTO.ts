import { ApiProperty } from "@nestjs/swagger"

export class tesisDTO{
    @ApiProperty()
    id_docente_tutor:number
    @ApiProperty()
    titulo:string
    @ApiProperty()
    fecha:Date
    @ApiProperty()
    documento:string
}