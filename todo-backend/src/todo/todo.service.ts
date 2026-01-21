import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async create(title: string): Promise<Todo> {
    const todo = this.todoRepository.create({ title, completed: false });
    return this.todoRepository.save(todo);
  }

  async update(id: number, completed: boolean): Promise<Todo | null> {
    await this.todoRepository.update(id, { completed });
    return this.todoRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
