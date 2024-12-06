import { Module } from '@nestjs/common';
import { SustentacionController } from './sustentacion.controller';
import { SustentacionService } from './sustentacion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { sustentacion } from './Entitys/sustentacion.entity';

@Module({
  imports:[TypeOrmModule.forFeature([sustentacion])],
  controllers: [SustentacionController],
  providers: [SustentacionService]
})
export class SustentacionModule {}
