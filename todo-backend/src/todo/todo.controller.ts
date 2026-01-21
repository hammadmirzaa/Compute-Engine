import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('api/todos')
export class TodoController {
  private todos: string[] = [];

  @Get()
  getTodos() {
    return this.todos;
  }

  @Post()
  addTodo(@Body('title') title: string) {
    this.todos.push(title);
    return { success: true };
  }
}
