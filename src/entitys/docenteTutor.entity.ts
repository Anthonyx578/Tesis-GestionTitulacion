import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class docente_Tutor{
    @PrimaryGeneratedColumn()
    id_docente_tutor:number
    @Column()
    id_usuario:number
    @Column()
    created_at:Date
    @Column()
    deleted_at:Date
    @Column()
    updated_at:Date
    @Column()
    status:number
}