import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, forkJoin, map, Observable, pipe, switchMap, throwError } from 'rxjs';
import { ProductList } from '../models/productList';
import { ProductService } from './product.service';
import { CartItem } from '../models/cart';
import { AuthService } from './auth.service';
import { User } from '../models/user';
@Injectable({
providedIn: 'root'
})
export class CartService {
  private apiUrl:string = 'api/cart';

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private authService: AuthService
    ) {}

  getCartItems(): Observable<CartItem[]> {
    const id = this.authService.getUser()?.id;
      return this.http.get<CartItem[]>(this.apiUrl).pipe(
        map(cart => cart.filter(i=>i.userId == id))
      );
  }
  getCartItem(id:number) : Observable<CartItem>{
    return this.http.get<CartItem>(this.apiUrl+'/'+id);
  }
  crateOrUpdateCartItem(cart: any): Observable<CartItem> {
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
          return this.http.post<CartItem>(this.apiUrl, cart, httpOptions);
        }
      })
    );
  }
  updateCartItem(cart: CartItem): Observable<any>  {
    const httpOptions= {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.apiUrl, cart, httpOptions)
  }
  deleteCartItem(id: number): Observable<CartItem>  {
    return this.http.delete<CartItem>(this.apiUrl+'/'+id)
  }

  deleteAllCartItems(): Observable<CartItem[]> {
    return this.getCartItems().pipe(
      switchMap(carts => {
        const deleteRequests = carts.map(c => this.deleteCartItem(c.id));
        return forkJoin(deleteRequests);
      })
    );
  }
}










