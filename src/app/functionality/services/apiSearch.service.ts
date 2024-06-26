import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiSearchService {

  private serverUrl: string;

  constructor(private http: HttpClient) {
    this.serverUrl = 'http://localhost:8080/proxy';
  }

  jishoRequest<T>(url: string, method: string): Observable<T> {
    //method = GET, since we want to fetch
    return this.http.post<T>(this.serverUrl, {url, method})
  }
}
