import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../model/user";
import {map} from "rxjs/operators";

const AUTH_API = 'http://localhost:8080/users';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User = <User>{};

  constructor(private http: HttpClient) {
  }

 /* public get currentUserValue(): User {
    return this.currentUserSubject.value;
  } */

  login(username: string, password: string) {
    return this.http.post<any>(AUTH_API + '/authenticate', {username, password})
      .pipe(map(user => {
        //localStorage.setItem('currentUser', JSON.stringify(user));
       // this.currentUserSubject.next(user);
        return user;
      }));
  }

 /* logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(this.user);
  }*/

  /*login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/authenticate', {
      username,
      password
    }, httpOptions);
  }*/

  register(form: any): Observable<any> {
    console.log('son form data ', form);
    return this.http.post('http://localhost:8080/users/register', form, httpOptions);
  }

  registerUser(user: User) {
    return this.http.post(AUTH_API + '/register', user);
  }
}
