import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, forkJoin, map, Observable, pipe, switchMap, throwError } from 'rxjs';
import { CartItem } from '../models/cart';
import { AuthService } from './auth.service';
@Injectable({
providedIn: 'root'
})
export class CartService {
  private apiUrl:string = 'api/cart';

  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) {}
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    const errorMessage = error.error?.message || 'An unexpected error occurred. Please try again later.';
    return throwError(() => new Error(errorMessage));
  }
  getCartItems(): Observable<CartItem[]> {
    const id = this.authService.getUser()?.id;
      return this.http.get<CartItem[]>(this.apiUrl).pipe(
        map(cart => cart.filter(i=>i.userId == id)),
        catchError(this.handleError)
      );
  }
  getCartItem(id:number) : Observable<CartItem>{
    return this.http.get<CartItem>(this.apiUrl+'/'+id).pipe(
      catchError(this.handleError)
    );
  }
  createOrUpdateCartItem(cart: any): Observable<CartItem> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.getCartItems().pipe(
      switchMap((cartItems) => {
        const existingItem = cartItems.find(item => item.id === cart.id);
        if (existingItem) {
          existingItem.quantity = cart.quantity || existingItem.quantity + 1;
          return this.updateCartItem(existingItem);
        } else {
          cart.quantity = 1;
          cart.userId = this.authService.getUser()?.id;
          return this.http.post<CartItem>(this.apiUrl, cart, httpOptions).pipe(
            catchError(this.handleError)
          );
        }
      }),
      catchError(this.handleError)
    );
  }
  updateCartItem(cart: CartItem): Observable<any>  {
    const httpOptions= {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.apiUrl, cart, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  deleteCartItem(id: number): Observable<CartItem>  {
    return this.http.delete<CartItem>(this.apiUrl+'/'+id).pipe(
      catchError(this.handleError)
    )
  }

  deleteAllCartItems(): Observable<CartItem[]> {
    return this.getCartItems().pipe(
      switchMap(carts => {
        const deleteRequests = carts.map(c => this.deleteCartItem(c.id));
        return forkJoin(deleteRequests);
      }),
      catchError(this.handleError)
    );
  }
}










