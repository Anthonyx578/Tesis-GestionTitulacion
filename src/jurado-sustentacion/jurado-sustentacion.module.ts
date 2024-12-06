import { Module } from '@nestjs/common';
import { JuradoSustentacionController } from './jurado-sustentacion.controller';
import { JuradoSustentacionService } from './jurado-sustentacion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { juradoSustentacion } from './Entitys/jurado-sustentacion.entity';

@Module({
  imports:[TypeOrmModule.forFeature([juradoSustentacion])],
  controllers: [JuradoSustentacionController],
  providers: [JuradoSustentacionService]
})
export class JuradoSustentacionModule {}
