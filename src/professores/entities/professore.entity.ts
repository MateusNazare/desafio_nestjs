import { Sala } from 'src/salas/entities/sala.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('professores')
export class Professore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  matricula: number;

  @Column()
  dataNascimento: Date;

  @OneToMany(() => Sala, (sala) => sala.professor)
  salas: Sala[];
}
