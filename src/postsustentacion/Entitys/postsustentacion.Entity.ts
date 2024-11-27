import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class postsustentacion {
  @PrimaryGeneratedColumn()
  id_postSustentacion: number;
  @Column()
  id_sustentacion: number;
  @Column()
  id_estudiante: number;
  @Column()
  calificacion: number;
  @Column()
  created_at: Date;
  @Column()
  deleted_at: Date;
  @Column()
  updated_at: Date;
  @Column()
  status: number;
}
