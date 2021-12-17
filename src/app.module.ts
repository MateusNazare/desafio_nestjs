import { Module } from '@nestjs/common';
import { AlunosModule } from './alunos/alunos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from './alunos/entities/aluno.entity';
import { ProfessoresModule } from './professores/professores.module';
import { Professore } from './professores/entities/professore.entity';
import { SalasModule } from './salas/salas.module';
import { Sala } from './salas/entities/sala.entity';

@Module({
  imports: [
    AlunosModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'desafio',
      entities: [Aluno, Professore, Sala],
      synchronize: true,
    }),
    ProfessoresModule,
    SalasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
