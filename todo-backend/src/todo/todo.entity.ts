export class Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(title: string) {
    this.id = Date.now(); // Simple ID generation using timestamp
    this.title = title;
    this.completed = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
