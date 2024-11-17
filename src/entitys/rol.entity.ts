import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class rol{
    @PrimaryGeneratedColumn()
    id_rol:number;
    @Column({length:20,unique:true})
    rol:string;
    @Column()
    created_at:Date;
    @Column()
    deleted_at:Date;
    @Column()
    updated_at:Date;
    @Column()
    status:number
}