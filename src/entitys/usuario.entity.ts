
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('usuario')
export class usuario {
    @PrimaryGeneratedColumn()
    id_usuario: number;

    @Column({ type: 'int'})
    id_carrera: number;

    @Column({ type: 'varchar', unique: true })
    nombre_usuario: string;

    @Column({ type: 'varchar' })
    contrasena: string;

    @Column({ type: 'varchar'})
    nombres: string;

    @Column({ type: 'varchar' })
    apellidos: string;

    @Column({ type: 'varchar' })
    telefono: string;

    @Column({ type: 'varchar' })
    correo: string;

    @Column({ type: 'date' })
    fecha_nacimiento: Date;

    @Column({ type: 'int',})
    id_rol: number;

    @Column({ type: 'timestamp' })
    created_at: Date;

    @Column({ type: 'timestamp'})
    deleted_at: Date;

    @Column({ type: 'timestamp'})
    updated_at: Date;

    @Column({ type: 'int' })
    status: number;
}
