import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TesisModule } from './tesis/tesis.module';
import { RequisitoModule } from './requisito/requisito.module';
import { RequisitoCumplidoModule } from './requisito-cumplido/requisito-cumplido.module';

@Module({
  imports: [TesisModule, RequisitoModule, RequisitoCumplidoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
