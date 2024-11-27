import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class requisitoCumplido {
  @PrimaryGeneratedColumn()
  id_estudiante: number;
  @Column()
  id_requisito: number;
  @Column()
  estado: number;
  @Column()
  created_at: Date;
  @Column()
  deleted_at: Date;
  @Column()
  updated_at: Date;
  @Column()
  status: number;
}
