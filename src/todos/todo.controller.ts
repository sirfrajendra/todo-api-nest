import { Body, Controller, Delete , Get , Param , Patch , Post } from '@nestjs/common';

import { CreateTodoDto } from '../dto/create-todo.dto.js';
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
  findAll() {
    return this.todoService.findAll();
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