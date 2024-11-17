import { Test, TestingModule } from '@nestjs/testing';
import { JuradoService } from './jurado.service';

describe('JuradoService', () => {
  let service: JuradoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JuradoService],
    }).compile();

    service = module.get<JuradoService>(JuradoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
