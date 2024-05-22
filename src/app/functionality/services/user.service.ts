import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlBase: string; 

  constructor(private http: HttpClient) {
    this.urlBase = "http://localhost:8080/api/users"
  }

  public fetchUser(username: string, password: string):Observable<User> {
    return this.http.get<User>(this.urlBase.concat("/", username, "/", password));
  }

  public registerUser(user: User) {
    const test = this.http.post<User>(this.urlBase.concat("/newUser"), user);
    
    return test;
  }
}
