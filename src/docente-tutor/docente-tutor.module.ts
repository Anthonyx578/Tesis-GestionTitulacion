import { Module } from '@nestjs/common';
import { DocenteTutorController } from './docente-tutor.controller';
import { DocenteTutorService } from './docente-tutor.service';

@Module({
  controllers: [DocenteTutorController],
  providers: [DocenteTutorService]
})
export class DocenteTutorModule {}
