import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { Repository } from 'typeorm';
import { Sala } from './entities/sala.entity';
import { Aluno } from 'src/alunos/entities/aluno.entity';

@Injectable()
export class SalasService {
  constructor(
    @InjectRepository(Sala)
    private salasRepository: Repository<Sala>,
  ) {}

  async create(createSalaDto: CreateSalaDto) {
    const sala = this.salasRepository.create(createSalaDto);
    await this.salasRepository.save(sala);
    return sala;
  }

  async findOne(id: number) {
    const sala = await this.salasRepository.findOne(id);
    return sala;
  }

  async update(id: number, updateSalaDto: UpdateSalaDto) {
    return await this.salasRepository.update(id, updateSalaDto);
  }

  async remove(id: number) {
    return await this.salasRepository.delete(id);
  }

  async addAluno(id: number, alunoId: number, professorId: number) {
    const sala = await this.salasRepository.findOne(id, {
      relations: ['alunos', 'professor'],
    });

    if (!sala) {
      return {
        error: 'Esta sala não existe',
      };
    }

    if (sala.professor.id !== professorId) {
      return {
        error: 'Permissão negada',
      };
    }

    if (sala.capacidade >= sala.alunos.length) {
      return {
        error: 'A sala está cheia',
      };
    }

    const aluno = await this.salasRepository.manager.findOne(Aluno, alunoId);

    if (!aluno) {
      return {
        error: 'Este aluno não existe',
      };
    }

    let existeAluno = false;
    sala.alunos.forEach((aluno: Aluno) => {
      if (aluno.id === alunoId) {
        existeAluno = true;
      }
    });

    if (existeAluno) {
      return {
        error: 'Este aluno já está nesta sala',
      };
    }

    sala.alunos.push(aluno);
    return await this.salasRepository.save(sala);
  }

  async removeAluno(id: number, alunoId: number, professorId: number) {
    const sala = await this.salasRepository.findOne(id, {
      relations: ['alunos'],
    });

    if (!sala) {
      return {
        error: 'Esta sala não existe',
      };
    }

    if (sala.professor.id !== professorId) {
      return {
        error: 'Permissão negada',
      };
    }

    const aluno = await this.salasRepository.manager.findOne(Aluno, alunoId);

    if (!aluno) {
      return {
        error: 'Este aluno não existe',
      };
    }

    let existeAluno = false;
    sala.alunos.forEach((aluno: Aluno) => {
      if (aluno.id === alunoId) {
        existeAluno = true;
      }
    });

    if (!existeAluno) {
      return {
        error: 'Este aluno não está nesta sala',
      };
    }

    sala.alunos = sala.alunos.filter((aluno) => {
      return aluno.id !== alunoId;
    });

    return await this.salasRepository.save(sala);
  }

  async findAllAlunos(id: number) {
    const sala = await this.salasRepository.findOne(id, {
      relations: ['alunos'],
    });

    if (!sala) {
      return {
        error: 'Esta sala não existe',
      };
    }

    return sala.alunos;
  }
}
