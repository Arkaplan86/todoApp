import {Todo} from "./todo";

export class List {
  id: number;
  description: string;
  createDate: Date;
  todoList: Array<Todo> = [];
  checked:boolean;


  constructor(id: number, description: string, createDate: Date, todoList: Todo[], checked: boolean) {
    this.id = id;
    this.description = description;
    this.createDate = createDate;
    this.todoList = todoList;
    this.checked = checked;
  }
}
