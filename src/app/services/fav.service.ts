import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, pipe, switchMap, throwError } from 'rxjs';
import { FavItem } from '../models/favItem';
import { ProductList } from '../models/productList';
import { ProductService } from './product.service';
import { AuthService } from './auth.service';
@Injectable({
providedIn: 'root'
})
export class FavService {
  private apiUrl:string = 'api/fav';

  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) {}

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    const errorMessage = error.error?.message || 'An unexpected error occurred. Please try again later.';
    return throwError(() => new Error(errorMessage));
  }
  getFavItems(): Observable<FavItem[]> {
    const id = this.authService.getUser()?.id ?? 0;
      return this.http.get<FavItem[]>(this.apiUrl).pipe(
        map(fav => fav.filter(i=>i.userId == id)),
        catchError(this.handleError)
      );
  }
  getFavItem(id:number): Observable<FavItem> {
    return this.http.get<FavItem>(this.apiUrl+'/'+id).pipe(
      map(fav => fav),
      catchError(this.handleError)
    );
  }
  isOrNot(id:number): Observable<boolean> {
    const userId = this.authService.getUser()?.id ?? 0;
    return this.http.get<FavItem>(this.apiUrl+'/'+id).pipe(
      map((fav) => fav.userId == userId),
      catchError(this.handleError)
    );
  }

  createFavItem(fav: ProductList): Observable<FavItem> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.getFavItems().pipe(
      map(c => {
        return fav as FavItem;
      }),
      switchMap((c) => {
        c.userId = this.authService.getUser()?.id ?? 0;
        return this.http.post<FavItem>(this.apiUrl, c, httpOptions);
      }),
      catchError(this.handleError)
    );
  }
  deleteFavItem(id: number): Observable<FavItem>  {
    return this.http.delete<FavItem>(this.apiUrl+'/'+id).pipe(
      catchError(this.handleError)
    )
  }
}









