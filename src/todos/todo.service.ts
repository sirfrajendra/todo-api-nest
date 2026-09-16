import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTodoDto } from '../dto/create-todo.dto.js';
import { GetTodosQueryDto } from '../dto/get-todos-query.dto.js';
import { UpdateTodoDto } from '../dto/update-todo.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  async createTodo(userId: number, body: CreateTodoDto) {
    return this.prisma.todo.create({
      data: {
        title: body.title,
        description: body.description,
        completed: body.completed,
        userId,
      },
    });
  }

  async findAll(userId: number, query: GetTodosQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const skip = (page - 1) * limit;

    const where: Prisma.TodoWhereInput = {
      userId,
      ...(query.completed !== undefined
        ? {
            completed: query.completed,
          }
        : {}),

      ...(query.search
        ? {
            OR: [
              {
                title: {
                  contains: query.search,
                  mode: 'insensitive',
                },
              },
              {
                description: {
                  contains: query.search,
                  mode: 'insensitive',
                },
              },
            ],
          }
        : {}),
    };

    const [data, total] = await Promise.all([
      this.prisma.todo.findMany({
        where,
        skip,
        take: limit,
      }),

      this.prisma.todo.count({
        where,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      page,
      limit,
      total,
      totalPages,
    };
  }

  async findOne(userId: number, id: string) {
    const todo = await this.prisma.todo.findUnique({
      where: {
        id: Number(id),
        userId,
      },
    });

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    return todo;
  }

  async update(userId: number, id: string, body: UpdateTodoDto) {
    const todo = await this.prisma.todo.findUnique({
      where: {
        id: Number(id),
        userId,
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

  async remove(userId: number, id: string) {
    const todo = await this.prisma.todo.findUnique({
      where: {
        id: Number(id),
        userId,
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