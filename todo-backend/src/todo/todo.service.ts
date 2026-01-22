import { Injectable } from '@nestjs/common';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  async findAll(): Promise<Todo[]> {
    return [...this.todos].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async create(title: string): Promise<Todo> {
    const todo = new Todo(title);
    this.todos.push(todo);
    return todo;
  }

  async update(id: number, completed: boolean): Promise<Todo | null> {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = completed;
      todo.updatedAt = new Date();
      return todo;
    }
    return null;
  }

  async delete(id: number): Promise<void> {
    this.todos = this.todos.filter(t => t.id !== id);
  }
}
