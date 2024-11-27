import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class requisito{
    @PrimaryGeneratedColumn()
    id_requisito:number
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