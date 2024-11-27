import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class tesis{
    @PrimaryGeneratedColumn()
    id_tesis:number
    @Column()
    id_docente_tutor:number
    @Column()
    titulo:string
    @Column()
    fecha:Date
    @Column()
    documento:string
    @Column()
    created_at:Date
    @Column()
    deleted_at:Date
    @Column()
    updated_at:Date
    @Column()
    status:number
}