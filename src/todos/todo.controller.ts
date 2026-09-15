import { Body, Controller, Delete , Get , Param , Patch , Post , Query } from '@nestjs/common';

import { CreateTodoDto } from '../dto/create-todo.dto.js';
import { GetTodosQueryDto } from '../dto/get-todos-query.dto.js';
import { UpdateTodoDto } from '../dto/update-todo.dto.js';
import { TodoService } from './todo.service.js';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  createTodo(@Body() body: CreateTodoDto) {
    return this.todoService.createTodo(body);
  }

  @Get()
  findAll(@Query() query: GetTodosQueryDto) {
    return this.todoService.findAll(query);
  } 

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateTodoDto,
  ) {
    return this.todoService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }

}