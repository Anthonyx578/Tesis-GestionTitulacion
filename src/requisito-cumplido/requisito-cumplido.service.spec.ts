import { Test, TestingModule } from '@nestjs/testing';
import { RequisitoCumplidoService } from './requisito-cumplido.service';

describe('RequisitoCumplidoService', () => {
  let service: RequisitoCumplidoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequisitoCumplidoService],
    }).compile();

    service = module.get<RequisitoCumplidoService>(RequisitoCumplidoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
