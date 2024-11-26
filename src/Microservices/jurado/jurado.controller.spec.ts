import { Test, TestingModule } from '@nestjs/testing';
import { JuradoController } from './jurado.controller';

describe('JuradoController', () => {
  let controller: JuradoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JuradoController],
    }).compile();

    controller = module.get<JuradoController>(JuradoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
