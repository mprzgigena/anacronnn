import { Module } from '@nestjs/common';
import { HistorialConsultasService } from './historial-consultas.service';
import { HistorialConsultasController } from './historial-consultas.controller';

@Module({
  controllers: [HistorialConsultasController],
  providers: [HistorialConsultasService],
})
export class HistorialConsultasModule {}
