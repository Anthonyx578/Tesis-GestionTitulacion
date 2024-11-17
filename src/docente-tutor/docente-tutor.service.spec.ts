import { Test, TestingModule } from '@nestjs/testing';
import { DocenteTutorService } from './docente-tutor.service';

describe('DocenteTutorService', () => {
  let service: DocenteTutorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocenteTutorService],
    }).compile();

    service = module.get<DocenteTutorService>(DocenteTutorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
