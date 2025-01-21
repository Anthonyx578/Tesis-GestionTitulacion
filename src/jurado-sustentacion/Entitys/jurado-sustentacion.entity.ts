import internal from "stream";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({name:'jurado_sustentacion'})
export class juradoSustentacion{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    id_jurado:number;
    @Column()
    id_sustentacion:number;
    @Column()
    estado:string
    @Column()
    indicacion:string
    @Column()
    fecha_indicacion:Date
    @Column()
    documento_revisar:string
    @Column()
    documento_revisado:string
    @Column()
    presente:number
    @Column()
    suplente:number
    @Column()
    created_at:Date
    @Column()
    deleted_at:Date
    @Column()
    updated_at:Date
    @Column()
    status:number
}