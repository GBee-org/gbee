import { Todo } from 'src/interfaces/todos.interfaces';
import { TodosService } from './todos.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTodoDto } from 'src/dto/todo';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll(): Todo[] {
    return this.todosService.findAll();
  }

  @Post()
  createTodo(@Body() newTodo: Todo): CreateTodoDto {
    return this.todosService.create(newTodo);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Todo {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  updateTodo(
    @Param('id') id: number,
    @Body() updateTodo: CreateTodoDto,
  ): Todo | NotFoundException {
    return this.todosService.update(id, updateTodo);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: number) {
    this.todosService.delete(id);
  }
}
