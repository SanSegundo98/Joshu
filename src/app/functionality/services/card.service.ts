import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Card } from '../types/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private urlBase: string; 

  constructor(private http: HttpClient) {
    this.urlBase = "http://localhost:8080/api/cards"
  }

  private errorHandler(error: any):Observable<never> {
    console.error(error);
    return throwError(() => new Error('Something failed, 1 sec pls ty'))
  }

  public fetchCardsFromUser(userID: any):Observable<Card> {
    return this.http.get<Card>(this.urlBase.concat('/', userID)).pipe(catchError((error) => this.errorHandler(error)))
  }

  public addNewCard(card: Card, userID: string) {
    return this.http.post<Card>(this.urlBase.concat('/newCard/',userID), card).pipe(catchError((error) => this.errorHandler(error)))
  }

}
