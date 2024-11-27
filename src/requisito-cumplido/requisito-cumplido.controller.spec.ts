import { Test, TestingModule } from '@nestjs/testing';
import { RequisitoCumplidoController } from './requisito-cumplido.controller';

describe('RequisitoCumplidoController', () => {
  let controller: RequisitoCumplidoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequisitoCumplidoController],
    }).compile();

    controller = module.get<RequisitoCumplidoController>(RequisitoCumplidoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
