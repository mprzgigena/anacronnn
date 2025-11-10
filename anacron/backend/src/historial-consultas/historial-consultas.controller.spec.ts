import { Test, TestingModule } from '@nestjs/testing';
import { HistorialConsultasController } from './historial-consultas.controller';
import { HistorialConsultasService } from './historial-consultas.service';

describe('HistorialConsultasController', () => {
  let controller: HistorialConsultasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistorialConsultasController],
      providers: [HistorialConsultasService],
    }).compile();

    controller = module.get<HistorialConsultasController>(HistorialConsultasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
