import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from 'src/dto/todo';
import { Todo } from 'src/interfaces/todos.interfaces';

@Injectable()
export class TodosService {
  todos: Todo[] = [
    { id: 1, title: 'Task 1', description: 'Create app ts app', done: false },
    { id: 2, title: 'Task 2', description: 'Create nest js app', done: true },
    { id: 3, title: 'Task 3', description: 'Create react app', done: false },
  ];

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    return this.todos.find((todo) => todo.id == id);
  }

  create(todo: CreateTodoDto): Todo {
    const newId = Math.max(...this.todos.map((todo) => todo.id)) + 1;
    const newTodo: Todo = {
      id: newId,
      title: todo.title,
      done: todo.done,
      description: todo.description,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  update(id: number, updateTodo: CreateTodoDto): Todo | NotFoundException {
    const updatedTodo = this.todos.find((todo) => todo.id == id);
    if (!updatedTodo)
      return new NotFoundException('Todo with id: ' + id + ' not found');
    if (updateTodo.title) updatedTodo.title = updateTodo.title;
    if (updateTodo.description)
      updatedTodo.description = updateTodo.description;
    if (updateTodo.done) updatedTodo.done = updateTodo.done;
    return updatedTodo;
  }

  delete(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id != id);
  }
}
