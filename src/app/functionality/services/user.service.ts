import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlBase: string; 
  public errorMsg: string = '';

  constructor(private http: HttpClient) {
    this.urlBase = "http://localhost:8080/api/users"
  }

  private errorHandler(error: any):Observable<never> {
    console.error(error);
    this.errorMsg = error.error.message   
    return throwError(() => new Error('Something failed, 1 sec pls ty'))
  }

  public fetchUser(username: string, password: string):Observable<User> {
    return this.http.get<User>(this.urlBase.concat("/", username, "/", password)).pipe(catchError((error) => this.errorHandler(error)));
  }

  public checkUser(username: string):Observable<User> {
    return this.http.get<User>(this.urlBase.concat("/", username)).pipe(catchError((error) => this.errorHandler(error)));
  }

  public registerUser(user: User) {
    return this.http.post<User>(this.urlBase.concat("/newUser"), user).pipe(catchError((error) => this.errorHandler(error)));   
  }
}
