import { Test, TestingModule } from '@nestjs/testing';
import { ReportajeController } from './reportaje.controller';

describe('ReportajeController', () => {
  let controller: ReportajeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportajeController],
    }).compile();

    controller = module.get<ReportajeController>(ReportajeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
