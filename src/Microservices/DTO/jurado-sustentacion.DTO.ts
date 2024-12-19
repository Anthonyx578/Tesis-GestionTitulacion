import { ApiProperty } from "@nestjs/swagger";

export class juradoSustentacionDTO{
    @ApiProperty()
    id_jurado:number;
    @ApiProperty()
    id_sustentacion:number;
    @ApiProperty()
    estado:string
    @ApiProperty()
    indicacion:string
    @ApiProperty()
    documento_revisar:string
    @ApiProperty()
    documento_revisado:string
    @ApiProperty()
    presente:number
    @ApiProperty()
    suplente:number
}