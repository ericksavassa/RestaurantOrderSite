import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Order } from './orders/orders';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://localhost:55293/api/order";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getOrders (): Observable<Order[]> {
    return this.http.get<Order[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched orders')),
        catchError(this.handleError('getOrders', []))
      );
  }

  addOrder (order): Observable<Order> {
    return this.http.post<Order>(apiUrl, order, httpOptions).pipe(
      tap((order: Order) => console.log(`added order w/ input=${order.input}`)),
      catchError(this.handleError<Order>('addOrder'))
    );
  }
}
