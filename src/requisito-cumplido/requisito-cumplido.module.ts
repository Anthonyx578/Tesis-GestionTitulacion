import { Module } from '@nestjs/common';
import { RequisitoCumplidoController } from './requisito-cumplido.controller';
import { RequisitoCumplidoService } from './requisito-cumplido.service';

@Module({
  controllers: [RequisitoCumplidoController],
  providers: [RequisitoCumplidoService]
})
export class RequisitoCumplidoModule {}
