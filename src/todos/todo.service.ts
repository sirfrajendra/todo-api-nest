import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTodoDto } from '../dto/create-todo.dto.js';
import { UpdateTodoDto } from '../dto/update-todo.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  async createTodo(body: CreateTodoDto) {
    return this.prisma.todo.create({
      data: {
        title: body.title,
        description: body.description,
        completed: body.completed,
      },
    });
  }
  
  async findAll() {
    return this.prisma.todo.findMany();
  }

  async findOne(id: string) {
    const todo = await this.prisma.todo.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    return todo;
  }

  async update(id: string, body: UpdateTodoDto) {
    const todo = await this.prisma.todo.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    return this.prisma.todo.update({
      where: {
        id: Number(id),
      },
      data: body,
    });
  }

  async remove(id: string) {
    const todo = await this.prisma.todo.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    return this.prisma.todo.delete({
      where: {
        id: Number(id),
      },
    });
  }
}