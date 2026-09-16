import { Body, Controller, Delete , Get , Param , Patch , Post , Query , UseGuards } from '@nestjs/common';
import type { AuthUser } from '../auth/auth-user.js';
import { CurrentUser } from '../auth/current-user.decorator.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

import { CreateTodoDto } from '../dto/create-todo.dto.js';
import { GetTodosQueryDto } from '../dto/get-todos-query.dto.js';
import { UpdateTodoDto } from '../dto/update-todo.dto.js';
import { TodoService } from './todo.service.js';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  createTodo(
    @CurrentUser() user: AuthUser,
    @Body() body: CreateTodoDto
  ) {
    return this.todoService.createTodo(user.sub, body);
  }

  @Get()
  findAll(
    @CurrentUser() user: AuthUser,
    @Query() query: GetTodosQueryDto) {
    return this.todoService.findAll(user.sub, query);
  } 

  @Get(':id')
  findOne(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string) {
    return this.todoService.findOne(user.sub, id);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() body: UpdateTodoDto,
  ) {
    return this.todoService.update(user.sub, id, body);
  }

  @Delete(':id')
  remove(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string) {
    return this.todoService.remove(user.sub, id);
  }

}