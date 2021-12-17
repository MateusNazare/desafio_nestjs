import { Aluno } from 'src/alunos/entities/aluno.entity';
import { Professore } from 'src/professores/entities/professore.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('salas')
export class Sala {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numeroSala: number;

  @Column()
  capacidade: number;

  @Column()
  disponibilidade: boolean;

  @ManyToOne(() => Professore, (professor) => professor.salas, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  professor: Professore;

  @ManyToMany(() => Aluno, (aluno) => aluno.salas)
  @JoinTable()
  alunos: Aluno[];
}
