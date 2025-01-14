import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Order, OrderItem, OrderList, OrderState } from '../models/order';
import { ProductList } from '../models/productList';
import { CartItem } from '../models/cart';
import { AdressItemService } from './adress.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'api/order';

  constructor(private http: HttpClient, private adressItemService: AdressItemService) {  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl).pipe(
      map(orders => orders )
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
  // getOrdersByOrderState(state:OrderState): Observable<Order[]> {
  //   return this.http.get<Order[]>(this.apiUrl).pipe(
  //     map(orders => orders.filter(i=>i.orderState==state) )
  //   );
  // }
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
  getOrderWithFullname(orderId: number): Observable<OrderList> {
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
        return o;
      }),
      switchMap((order) => {
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
