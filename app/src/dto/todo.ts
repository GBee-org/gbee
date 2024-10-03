export class CreateTodoDto {
  readonly title: string;
  readonly done: boolean;
  readonly description?: string;
}

export class UpdateTodoDto extends CreateTodoDto {
  readonly id: number;
}
