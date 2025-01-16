import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { Order, OrderItem, OrderList, OrderState } from '../models/order';
import { ProductList } from '../models/productList';
import { CartItem } from '../models/cart';
import { AdressItemService } from './adress.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'api/order';

  constructor(private http: HttpClient,
    private adressItemService: AdressItemService,
    private authService: AuthService
  ) {  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl).pipe(
      map(orders => orders )
    );
  }

  getOrdersByUserId(): Observable<Order[]> {
    const currentUser = this.authService.getUser();
    return this.http.get<Order[]>(this.apiUrl).pipe(
      map(orders => orders.filter(i=>i.userId == currentUser?.id) )
    );
  }
  getOrdersByOrderState(state?: OrderState): Observable<OrderList[]> {
    return this.http.get<Order[]>(this.apiUrl).pipe(
      switchMap(orders => {
        const filteredOrders = (state == null) ? orders: orders.filter(i => i.orderState == state) ;
        const ordersWithAddress$ = filteredOrders.reverse().map(order =>
          this.adressItemService.getAdressItem(order.adressId).pipe(
            map(address => ({
              ...order,
              adressFullname: address.fullname
            }))
          )
        );
        return forkJoin(ordersWithAddress$);
      })
    );
  }
  getOrdersWithFullname(): Observable<OrderList[]> {
    return this.http.get<Order[]>(this.apiUrl).pipe(
      switchMap(orders => {
        const ordersWithAddress$ = orders.map(order =>
          this.adressItemService.getAdressItem(order.adressId).pipe(
            map(address => ({
              ...order,
              adressFullname: address.fullname
            }))
          )
        );
        return forkJoin(ordersWithAddress$.reverse());
      })
    );
  }
  getOrdersWithFullnameByUserId(): Observable<OrderList[]> {
    const currentUser = this.authService.getUser();
    return this.http.get<Order[]>(this.apiUrl).pipe(
      switchMap(orders => {
        const ordersWithAddress$ = orders
        .filter(i=>i.userId == currentUser?.id)
        .map(order =>
          this.adressItemService.getAdressItem(order.adressId).pipe(
            map(address => ({
              ...order,
              adressFullname: address.fullname
            }))
          )
        );
        return forkJoin(ordersWithAddress$.reverse());
      })
    );
  }

  getOrderWithFullname(orderId: number): Observable<OrderList> {
    const currentUser = this.authService.getUser();
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`).pipe(
      switchMap(order =>
        this.adressItemService.getAdressItem(order.adressId).pipe(
          map(address => ({
            ...order,
            adressFullname: address.fullname
          }))
        )
      )
    );
  }
  getOrderWithFullnameByUserId(orderId: number): Observable<OrderList | null> {
    const currentUser = this.authService.getUser();
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`).pipe(
      switchMap(order => {
        if (order.userId !== currentUser?.id) {
          return of(null);
        }
        return this.adressItemService.getAdressItem(order.adressId).pipe(
          map(address => ({
            ...order,
            adressFullname: address.fullname,
          }))
        );
      })
    );
  }
  getOrder(id:number) :Observable<Order>{
    return this.http.get<Order>(this.apiUrl+'/'+id);
  }
  createOrder(cartItems: CartItem[],adressId:number): Observable<Order> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.getOrders().pipe(
      map(orders => {
        const o = new Order();
        const lastId = orders.length > 0 ? orders.at(-1)?.id ?? 0 : 0;
        o.id = lastId + 1;
        o.adressId = adressId;

        o.orderItems = cartItems.map(p => ({
          id: p.id,
          orderId: lastId + 1,
          quantity: p.quantity,
          unitPrice: p.price,
          name: p.name,
          imgUrl: p.imgUrl,
          orderState: OrderState.inProgress
        }));
        return o
      }),
      switchMap((order) => {
        order.userId = this.authService.getUser()?.id ?? 0;
        return this.http.post<Order>(this.apiUrl, order, httpOptions);
      })
    );
  }
  updateOrder(order: Order): Observable<any>  {
    const httpOptions= {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.apiUrl, order, httpOptions)
  }
  deleteOrder(id: number): Observable<Order>  {
    return this.http.delete<Order>(this.apiUrl+'/'+id)
  }
}
