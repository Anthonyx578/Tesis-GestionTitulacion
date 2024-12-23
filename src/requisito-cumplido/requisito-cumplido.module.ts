import { Module } from '@nestjs/common';
import { RequisitoCumplidoController } from './requisito-cumplido.controller';
import { RequisitoCumplidoService } from './requisito-cumplido.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { requisitoCumplido } from './Entitys/requisito-cumplido.entity';
import { RequisitoService } from 'src/requisito/requisito.service';
import { requisito } from 'src/requisito/Entitys/requisitos.entity';

@Module({
  imports:[TypeOrmModule.forFeature([requisitoCumplido,requisito])],
  controllers: [RequisitoCumplidoController],
  providers: [RequisitoCumplidoService,RequisitoService]
})
export class RequisitoCumplidoModule {}
