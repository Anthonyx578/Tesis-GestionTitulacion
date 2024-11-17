import { Module } from '@nestjs/common';
import { JuradoController } from './jurado.controller';
import { JuradoService } from './jurado.service';

@Module({
  controllers: [JuradoController],
  providers: [JuradoService]
})
export class JuradoModule {}
