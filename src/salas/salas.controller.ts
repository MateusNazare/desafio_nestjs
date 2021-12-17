import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SalasService } from './salas.service';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { response } from 'express';

@Controller('salas')
export class SalasController {
  constructor(private readonly salasService: SalasService) {}

  @Post()
  create(@Body() createSalaDto: CreateSalaDto) {
    return this.salasService.create(createSalaDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSalaDto: UpdateSalaDto) {
    return this.salasService.update(+id, updateSalaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salasService.remove(+id);
  }

  @Patch('/add/:id')
  addAluno(
    @Param('id') id: string,
    @Body('alunoId') alunoId: number,
    @Body('professorId') professorId: number,
  ) {
    return this.salasService.addAluno(+id, alunoId, professorId);
  }

  @Delete('/remove/:id')
  removeAluno(
    @Param('id') id: string,
    @Body('alunoId') alunoId: number,
    @Body('professorId') professorId: number,
  ) {
    return this.salasService.removeAluno(+id, alunoId, professorId);
  }

  @Get('/alunos/:id')
  findAllAlunos(@Param('id') id: string) {
    return this.salasService.findAllAlunos(+id);
  }
}
