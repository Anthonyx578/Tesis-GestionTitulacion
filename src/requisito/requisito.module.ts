import { Module } from '@nestjs/common';
import { RequisitoController } from './requisito.controller';
import { RequisitoService } from './requisito.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { requisito } from './Entitys/requisitos.entity';

@Module({
  imports:[TypeOrmModule.forFeature([requisito])],
  controllers: [RequisitoController],
  providers: [RequisitoService]
})
export class RequisitoModule {}
