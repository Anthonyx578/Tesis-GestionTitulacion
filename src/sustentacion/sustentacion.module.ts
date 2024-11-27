import { Module } from '@nestjs/common';
import { SustentacionController } from './sustentacion.controller';
import { SustentacionService } from './sustentacion.service';

@Module({
  controllers: [SustentacionController],
  providers: [SustentacionService]
})
export class SustentacionModule {}
