import { Test, TestingModule } from '@nestjs/testing';
import { HistorialConsultasService } from './historial-consultas.service';

describe('HistorialConsultasService', () => {
  let service: HistorialConsultasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistorialConsultasService],
    }).compile();

    service = module.get<HistorialConsultasService>(HistorialConsultasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
