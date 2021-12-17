import { Module } from '@nestjs/common';
import { ProfessoresService } from './professores.service';
import { ProfessoresController } from './professores.controller';
import { Professore } from './entities/professore.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Professore])],
  exports: [TypeOrmModule],
  controllers: [ProfessoresController],
  providers: [ProfessoresService],
})
export class ProfessoresModule {}
