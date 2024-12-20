import { Module } from '@nestjs/common';
import { RequisitoCumplidoController } from './requisito-cumplido.controller';
import { RequisitoCumplidoService } from './requisito-cumplido.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { requisitoCumplido } from './Entitys/requisito-cumplido.entity';

@Module({
  imports:[TypeOrmModule.forFeature([requisitoCumplido])],
  controllers: [RequisitoCumplidoController],
  providers: [RequisitoCumplidoService]
})
export class RequisitoCumplidoModule {}
