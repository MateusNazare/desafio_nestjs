import { Module } from '@nestjs/common';
import { SalasService } from './salas.service';
import { SalasController } from './salas.controller';
import { Sala } from './entities/sala.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Sala])],
  exports: [TypeOrmModule],
  controllers: [SalasController],
  providers: [SalasService],
})
export class SalasModule {}
