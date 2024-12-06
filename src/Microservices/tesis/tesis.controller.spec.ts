import { Test, TestingModule } from '@nestjs/testing';
import { TesisController } from './tesis.controller';

describe('TesisController', () => {
  let controller: TesisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TesisController],
    }).compile();

    controller = module.get<TesisController>(TesisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
