import { Test, TestingModule } from '@nestjs/testing';
import { PostsustentacionService } from './postsustentacion.service';

describe('PostsustentacionService', () => {
  let service: PostsustentacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsustentacionService],
    }).compile();

    service = module.get<PostsustentacionService>(PostsustentacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
