import { Module } from '@nestjs/common';
import { JuradoSustentacionController } from './jurado-sustentacion.controller';
import { JuradoSustentacionService } from './jurado-sustentacion.service';

@Module({
  controllers: [JuradoSustentacionController],
  providers: [JuradoSustentacionService]
})
export class JuradoSustentacionModule {}
