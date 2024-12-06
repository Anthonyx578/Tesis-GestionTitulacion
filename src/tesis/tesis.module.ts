import { Module } from '@nestjs/common';
import { TesisController } from './tesis.controller';
import { TesisService } from './tesis.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tesis } from './Entitys/tesis.Entity';

@Module({
  imports: [TypeOrmModule.forFeature([tesis])],
  controllers: [TesisController],
  providers: [TesisService],
})
export class TesisModule {}
