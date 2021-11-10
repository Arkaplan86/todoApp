import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Todo} from "../model/todo";
import {map} from "rxjs/operators";

const AUTH_API = 'http://localhost:8080/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {
  }

  getTodoList(id: number): Observable<any> {
    return this.http.get(AUTH_API + '/' + id);
  }

  getDayTodo(): Observable<any> {
    return this.http.get(AUTH_API + '/day');
  }

  getWeekTodo(): Observable<any> {
    return this.http.get(AUTH_API + '/week');
  }

  createTodo(todo: Todo): Observable<any> {
    return this.http.post(AUTH_API + '/add/' + todo.listId, todo);
  }

  deleteTodoList(list: Array<number>) {
    return this.http.delete(AUTH_API + '/delete', {body: list});
  }

}
