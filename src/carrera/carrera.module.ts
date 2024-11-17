import { Module } from '@nestjs/common';
import { CarreraController } from './carrera.controller';
import { CarreraService } from './carrera.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { carrera } from 'src/entitys/carrera.entity';

@Module({
  imports:[TypeOrmModule.forFeature([carrera])],
  controllers: [CarreraController],
  providers: [CarreraService],
  exports:[CarreraService]
})
export class CarreraModule {}
