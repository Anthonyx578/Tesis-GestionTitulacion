import { Test, TestingModule } from '@nestjs/testing';
import { JuradoSustentacionController } from './jurado-sustentacion.controller';

describe('JuradoSustentacionController', () => {
  let controller: JuradoSustentacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JuradoSustentacionController],
    }).compile();

    controller = module.get<JuradoSustentacionController>(JuradoSustentacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
