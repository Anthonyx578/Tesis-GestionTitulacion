import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule

 } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SustentacionModule } from './sustentacion/sustentacion.module';
import { PostsustentacionModule } from './postsustentacion/postsustentacion.module';
import { JuradoSustentacionModule } from './jurado-sustentacion/jurado-sustentacion.module';
import { sustentacion } from './sustentacion/Entitys/sustentacion.entity';
import { postsustentacion } from './postsustentacion/Entitys/postsustentacion.Entity';
import { juradoSustentacion } from './jurado-sustentacion/Entitys/jurado-sustentacion.entity';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      database:process.env.DbName,
      host:process.env.DbHost,
      port:Number(process.env.DbPort),
      type:"postgres",
      entities:[sustentacion,postsustentacion,juradoSustentacion],
      username:process.env.DbUserName,
      password:process.env.DbPassWord    
    }),
    SustentacionModule,
    PostsustentacionModule,
    JuradoSustentacionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
