import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticacionController } from './authenticacion.controller';

describe('AuthenticacionController', () => {
  let controller: AuthenticacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticacionController],
    }).compile();

    controller = module.get<AuthenticacionController>(AuthenticacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
