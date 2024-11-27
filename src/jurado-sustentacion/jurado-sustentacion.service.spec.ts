import { Test, TestingModule } from '@nestjs/testing';
import { JuradoSustentacionService } from './jurado-sustentacion.service';

describe('JuradoSustentacionService', () => {
  let service: JuradoSustentacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JuradoSustentacionService],
    }).compile();

    service = module.get<JuradoSustentacionService>(JuradoSustentacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
