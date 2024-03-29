import { Sala } from 'src/salas/entities/sala.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity('alunos')
export class Aluno {
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

  @ManyToMany(() => Sala, (sala) => sala.alunos)
  salas: Sala[];
}
