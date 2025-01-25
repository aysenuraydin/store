import { Injectable } from '@angular/core';
import { SubscribeRepository } from '../repository/subscribe.repository';
import { Subscribe } from '../models/Subscribe';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {
  private apiUrl = 'api/subscribe';

  constructor (private http: HttpClient) { }
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    const errorMessage = error.error?.message || 'An unexpected error occurred. Please try again later.';
    return throwError(() => new Error(errorMessage));
  }
  searchSubscribes(query: string, pageNumber: number = 1, pageSize: number = 3): Observable<{ products: Subscribe[]; totalPages: number }> {
    return this.getAllSubscribes().pipe(
        map(response => {
            const filteredProducts = response.filter(category =>  [category.email]
                    .some(field => field?.toLowerCase().includes(query.toLowerCase()))
            );

            const startIndex = (pageNumber - 1) * pageSize;
            const paginatedProducts = pageSize > 0 ? filteredProducts.reverse().slice(startIndex, startIndex + pageSize) : filteredProducts;
            const totalPages = Math.ceil(filteredProducts.length / pageSize);

            return { products: paginatedProducts, totalPages };
        }),
        catchError(this.handleError)
    );
  }
  getAllSubscribes() :Observable<Subscribe[]> {
    return this.http.get<Subscribe[]>(this.apiUrl).pipe(
      map(categories => categories),
      catchError(this.handleError)
    );
  }
  getSubscribes(pageNumber: number = 1, pageSize: number = 3): Observable<{ products: Subscribe[]; totalPages: number }> {
    return this.getAllSubscribes().pipe(
        map(products => {
            const startIndex = (pageNumber - 1) * pageSize;
            const paginatedProducts = pageSize > 0 ? products.reverse().slice(startIndex, startIndex + pageSize) : products;
            const totalPages = Math.ceil(products.length / pageSize);

            return { products: paginatedProducts, totalPages };
        }),
        catchError(this.handleError)
    );
  }
  getSubscribe(id:number) : Observable<Subscribe>{
    return this.http.get<Subscribe>(this.apiUrl+'/'+id);
  }
  createSubscribe(subscribe: Subscribe): Observable<Subscribe> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.getAllSubscribes().pipe(
      map(subscribes => {
        const lastId = subscribes.length > 0 ? subscribes.at(-1)?.id ?? 0 : 0;
        subscribe.id = lastId + 1;
        return subscribe;
      }),
      switchMap((updatedSubscribe) => {
        return this.http.post<Subscribe>(this.apiUrl, updatedSubscribe, httpOptions);
      }),
      catchError(this.handleError)
    );
  }
  updateSubscribe(subscribe: Subscribe): Observable<any>  {
    const httpOptions= {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.apiUrl, subscribe, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  deleteSubscribe(id: number): Observable<Subscribe>  {
    return this.http.delete<Subscribe>(this.apiUrl+'/'+id).pipe(
      catchError(this.handleError)
    )
  }
}
