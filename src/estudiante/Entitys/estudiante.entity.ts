import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class estudiante{
    @PrimaryGeneratedColumn()
    id_estudiante:number
    @Column()
    id_tesis:number
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