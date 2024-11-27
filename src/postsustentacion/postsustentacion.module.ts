import { Module } from '@nestjs/common';
import { PostsustentacionController } from './postsustentacion.controller';
import { PostsustentacionService } from './postsustentacion.service';

@Module({
  controllers: [PostsustentacionController],
  providers: [PostsustentacionService]
})
export class PostsustentacionModule {}
