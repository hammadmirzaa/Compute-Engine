import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('api/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodos() {
    return this.todoService.findAll();
  }

  @Post()
  async createTodo(@Body('title') title: string) {
    return this.todoService.create(title);
  }

  @Put(':id')
  async updateTodo(@Param('id') id: string, @Body('completed') completed: boolean) {
    return this.todoService.update(parseInt(id, 10), completed);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string) {
    await this.todoService.delete(parseInt(id, 10));
    return { success: true };
  }
}
