import { Test, TestingModule } from '@nestjs/testing';
import { SustentacionController } from './sustentacion.controller';

describe('SustentacionController', () => {
  let controller: SustentacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SustentacionController],
    }).compile();

    controller = module.get<SustentacionController>(SustentacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
