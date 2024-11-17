import { Module } from '@nestjs/common';
import { RolController } from './rol.controller';
import { RolService } from './rol.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { rol } from 'src/entitys/rol.entity';

@Module({
  imports:[TypeOrmModule.forFeature([rol])],
  controllers: [RolController],
  providers: [RolService],
  exports: [RolService]
})
export class RolModule {}
