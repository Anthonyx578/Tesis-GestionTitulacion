import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class sustentacion {
  @PrimaryGeneratedColumn()
  id_sustentacion: number;
  @Column()
  id_tesis: number;
  @Column()
  id_carrera: number;
  @Column()
  tipo: string;
  @Column()
  fecha_sustentacion: Date;
  @Column()
  estado_sustentacion: string;
  @Column()
  periodo_academico: string;
  @Column()
  aula:string
  @Column()
  created_at: Date;
  @Column()
  deleted_at: Date;
  @Column()
  updated_at: Date;
  @Column()
  status: number;
}
