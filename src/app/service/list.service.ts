import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {List} from "../model/list";

const AUTH_API = 'http://localhost:8080/list';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) {
  }

  getList(): Observable<any> {
    return this.http.get(AUTH_API + '/all')
  }

  createList(list: List): Observable<any> {
    console.log('todo post', list)
    return this.http.post(AUTH_API + '/add', list).pipe(
      map(response => {
        return response;
      })
    )
  }

  deleteList(list: Array<number>) {
    return this.http.delete(AUTH_API + '/delete', {body: list});
  }

}
