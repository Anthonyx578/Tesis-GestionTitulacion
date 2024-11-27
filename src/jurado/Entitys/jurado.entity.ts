import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class jurado{
    @PrimaryGeneratedColumn()
    id_jurado:number
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