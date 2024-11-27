import { Module } from '@nestjs/common';
import { DocenteTutorController } from './docente-tutor.controller';
import { DocenteTutorService } from './docente-tutor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { docente_Tutor } from 'src/docente-tutor/Entitys/docenteTutor.entity';

@Module({
  imports:[TypeOrmModule.forFeature([docente_Tutor])],
  controllers: [DocenteTutorController],
  providers: [DocenteTutorService]
})
export class DocenteTutorModule {}
