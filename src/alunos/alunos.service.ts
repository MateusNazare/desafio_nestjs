import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Aluno } from './entities/aluno.entity';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AlunosService {
  constructor(
    @InjectRepository(Aluno)
    private alunosRepository: Repository<Aluno>,
  ) {}

  async create(createAlunoDto: CreateAlunoDto) {
    const aluno = this.alunosRepository.create(createAlunoDto);
    await this.alunosRepository.save(aluno);
    return aluno;
  }

  async findOne(id: number) {
    const aluno = await this.alunosRepository.findOne(id);
    return aluno;
  }

  async update(id: number, updateAlunoDto: UpdateAlunoDto) {
    return await this.alunosRepository.update(id, updateAlunoDto);
  }

  async remove(id: number) {
    return await this.alunosRepository.delete(id);
  }

  async findAllSalas(id: number) {
    const aluno = await this.alunosRepository.findOne(id, {
      relations: ['salas', 'salas.professor'],
    });

    if (!aluno) {
      return {
        error: 'Este Aluno não existe',
      };
    }

    return aluno.salas;
  }
}
