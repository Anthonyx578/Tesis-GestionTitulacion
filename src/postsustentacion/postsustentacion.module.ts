import { Module } from '@nestjs/common';
import { PostsustentacionController } from './postsustentacion.controller';
import { PostsustentacionService } from './postsustentacion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postsustentacion } from './Entitys/postsustentacion.Entity';

@Module({
  imports: [TypeOrmModule.forFeature([postsustentacion])],
  controllers: [PostsustentacionController],
  providers: [PostsustentacionService]
})
export class PostsustentacionModule {}
