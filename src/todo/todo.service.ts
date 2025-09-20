import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Todo } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, title: string, description: string): Promise<Todo> {
    return this.prisma.todo.create({
      data: { 
        title,
        description: description, 
        userId 
    },
    });
  }

  async findAll(userId: number): Promise<Todo[]> {
    return this.prisma.todo.findMany({ where: { userId } });
  }

  async findOne(userId: number, id: number) {
    return this.prisma.todo.findFirst({ where: { id, userId } });
  }

  async update(userId: number, id: number, data: Partial<Todo>) {
    return this.prisma.todo.update({
      where: { 
        id ,
        userId
      },
      data,
    });
  }

  async remove(userId: number, id: number) {
    return this.prisma.todo.delete({
      where: { 
        id,
        userId
       },
    });
  }
}
