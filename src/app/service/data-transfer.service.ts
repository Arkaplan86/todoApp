import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Todo} from "../model/todo";

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  todo: Todo = <Todo>{};
  todoList: Array<Todo> = [];
  deleteTodoItemList: Array<number> = [];

  constructor() {
  }

  private isPassiveMessageSource = new BehaviorSubject(false);
  currentIsPassiveStatus = this.isPassiveMessageSource.asObservable();


  private isTodoCreateSource = new BehaviorSubject(true);
  currentIsTodoStatus = this.isTodoCreateSource.asObservable();


  private todoDataSource = new BehaviorSubject(this.todo);
  currentTodoData = this.todoDataSource.asObservable();

  private deleteTodoDataSource = new BehaviorSubject(this.deleteTodoItemList);
  currentDeleteTodoData = this.deleteTodoDataSource.asObservable();

  private todoDataListSource = new BehaviorSubject(this.todoList);
  currentTodoDataList = this.todoDataListSource.asObservable();

  private isloginMessageSource = new BehaviorSubject(false);
  currentIsLoginStatus = this.isloginMessageSource.asObservable();

  changePassiveStatus(isPassive: boolean) {
    this.isPassiveMessageSource.next(isPassive);
  }

  changeLoginStatus(isLogin: boolean) {
    this.isloginMessageSource.next(isLogin);
  }

  changeIsTodoStatus(isActive: boolean) {
    this.isTodoCreateSource.next(isActive);
  }

  changeTodoData(todo: Todo) {
    this.todoDataSource.next(todo);
  }

  changeTodoListData(todoList: Array<Todo>) {
    this.todoDataListSource.next(todoList);
  }
  deleteTodoListData(todoList: Array<number>) {
    this.deleteTodoDataSource.next(todoList);
  }


}
