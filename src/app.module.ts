import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { TodoModule } from './todos/todo.module.js';
import { UserModule } from './users/user.module.js';


@Module({
  imports: [PrismaModule, TodoModule, UserModule],
  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
