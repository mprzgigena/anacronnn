import { Test, TestingModule } from '@nestjs/testing';
import { ObrasSocialesController } from './obras-sociales.controller';
import { ObrasSocialesService } from './obras-sociales.service';

describe('ObrasSocialesController', () => {
  let controller: ObrasSocialesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObrasSocialesController],
      providers: [ObrasSocialesService],
    }).compile();

    controller = module.get<ObrasSocialesController>(ObrasSocialesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
