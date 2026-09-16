import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TodoController } from './todo.controller.js';
import { TodoService } from './todo.service.js';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}