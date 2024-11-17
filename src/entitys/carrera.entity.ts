import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('carrera')
export class carrera {
    @PrimaryGeneratedColumn()
    id_carrera: number;

    @Column({ type: 'varchar', unique: true })
    nombre_carrera: string;

    @Column({ type: 'timestamp' })
    created_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    deleted_at: Date;

    @Column({ type: 'timestamp' })
    updated_at: Date;

    @Column({ type: 'int', default: 1 })
    status: number;
}