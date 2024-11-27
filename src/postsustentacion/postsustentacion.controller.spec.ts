import { Test, TestingModule } from '@nestjs/testing';
import { PostsustentacionController } from './postsustentacion.controller';

describe('PostsustentacionController', () => {
  let controller: PostsustentacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsustentacionController],
    }).compile();

    controller = module.get<PostsustentacionController>(PostsustentacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
