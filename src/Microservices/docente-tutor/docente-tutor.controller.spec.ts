import { Test, TestingModule } from '@nestjs/testing';
import { DocenteTutorController } from './docente-tutor.controller';

describe('DocenteTutorController', () => {
  let controller: DocenteTutorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocenteTutorController],
    }).compile();

    controller = module.get<DocenteTutorController>(DocenteTutorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
