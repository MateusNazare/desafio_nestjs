import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfessoreDto } from './dto/create-professore.dto';
import { UpdateProfessoreDto } from './dto/update-professore.dto';
import { Professore } from './entities/professore.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfessoresService {
  constructor(
    @InjectRepository(Professore)
    private professoresRepository: Repository<Professore>,
  ) {}

  async create(createProfessoreDto: CreateProfessoreDto) {
    const professor = this.professoresRepository.create(createProfessoreDto);
    await this.professoresRepository.save(professor);
    return professor;
  }

  async findOne(id: number) {
    const professor = await this.professoresRepository.findOne(id);
    return professor;
  }

  async update(id: number, updateProfessoreDto: UpdateProfessoreDto) {
    return await this.professoresRepository.update(id, updateProfessoreDto);
  }

  async remove(id: number) {
    return await this.professoresRepository.delete(id);
  }
}
