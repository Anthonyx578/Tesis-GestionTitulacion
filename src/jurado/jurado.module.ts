import { Module } from '@nestjs/common';
import { JuradoController } from './jurado.controller';
import { JuradoService } from './jurado.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jurado } from 'src/jurado/Entitys/jurado.entity';

@Module({
  imports:[TypeOrmModule.forFeature([jurado])],
  controllers: [JuradoController],
  providers: [JuradoService]
})
export class JuradoModule {}
