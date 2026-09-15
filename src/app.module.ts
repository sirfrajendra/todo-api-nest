import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { TodoModule } from './todos/todo.module.js';


@Module({
  imports: [PrismaModule, TodoModule],
  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
