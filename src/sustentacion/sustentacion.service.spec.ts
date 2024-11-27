import { Test, TestingModule } from '@nestjs/testing';
import { SustentacionService } from './sustentacion.service';

describe('SustentacionService', () => {
  let service: SustentacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SustentacionService],
    }).compile();

    service = module.get<SustentacionService>(SustentacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
