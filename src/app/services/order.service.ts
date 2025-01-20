import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { Order, OrderItem, OrderList, OrderState } from '../models/order';
import { ProductList } from '../models/productList';
import { CartItem } from '../models/cart';
import { AdressItemService } from './adress.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'api/order';

  constructor(private http: HttpClient,
    private adressItemService: AdressItemService,
    private userService: UserService,
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
  getAllOrdersWithFullname(): Observable<(OrderList & { username: string; adressFullname: string })[]> {
    return this.http.get<Order[]>(this.apiUrl).pipe(
      switchMap(orders => {
        const ordersWithDetails$ = orders.map(order =>
          forkJoin({
            address: this.adressItemService.getAdressItem(order.adressId),
            user: this.userService.getUser(order.userId)
          }).pipe(
            map(({ address, user }) => ({
              ...order,
              adressFullname: address ? address.fullname : 'Unknown Address',
              username: user ? `${user.name} ${user.surname}` : 'Unknown User'
            })),
            catchError(err => {
              console.error('Error fetching address or user:', err);
              return of({
                ...order,
                adressFullname: 'Error retrieving address',
                username: 'Error retrieving user'
              });
            })
          )
        );
        return forkJoin(ordersWithDetails$);
      })
    );
  }
  getOrdersWithFullname(pageNumber: number = 1, pageSize: number = 3,state?:OrderState): Observable<{ products: (OrderList & { username: string; })[]; totalPages: number }> {
    return this.getAllOrdersWithFullname().pipe(
        map(products => {
          const filteredProducts = (state==null)? products: products.filter(i => i.orderState == state);
          const startIndex = (pageNumber - 1) * pageSize;
          const paginatedProducts = pageSize > 0
            ? filteredProducts.reverse().slice(startIndex, startIndex + pageSize)
            : filteredProducts;
          const totalPages = Math.ceil(filteredProducts.length / pageSize);

          return { products: paginatedProducts, totalPages };
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

  getOrderWithFullname(id: number): Observable<OrderList & { username: string; adressFullname: string }> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`).pipe(
      switchMap(order =>
        forkJoin({
          address: this.adressItemService.getAdressItem(order.adressId),
          user: this.userService.getUser(order.userId)
        }).pipe(
          map(({ address, user }) => ({
            ...order,
            adressFullname: address ? address.fullname : 'Unknown Address',
            username: user ? `${user.name} ${user.surname}` : 'Unknown User'
          })),
          catchError(err => {
            console.error('Error fetching address or user:', err);
            return of({
              ...order,
              adressFullname: 'Error retrieving address',
              username: 'Error retrieving user'
            });
          })
        )
      )
    );
  }

  searchOrders(query: string,pageNumber: number = 1, pageSize: number = 3, state?:OrderState): Observable<{ products: (OrderList & { username: string; })[]; totalPages: number }> {
    return this.getAllOrdersWithFullname().pipe(
        map(response => {
            const orders = response.filter(order =>
              [order.orderCode, order.adressFullname, order.orderState, order.username]
                    .some(field => field?.toLowerCase().includes(query.toLowerCase()))
            );
            const filteredProducts = (state==null)? orders: orders.filter(i => i.orderState == state);
            const startIndex = (pageNumber - 1) * pageSize;
            const paginatedProducts = pageSize > 0 ? filteredProducts.reverse().slice(startIndex, startIndex + pageSize) : filteredProducts;
            const totalPages = Math.ceil(filteredProducts.length / pageSize);

            return { products: paginatedProducts, totalPages };
        })
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
// getOrdersWithFullname2(): Observable<(OrderList & { username: string; })[]> {
//   return this.http.get<Order[]>(this.apiUrl).pipe(
//     switchMap(orders => {
//       const ordersWithDetails$ = orders.map(order =>
//         forkJoin({
//           address: this.adressItemService.getAdressItem(order.adressId),
//           user: this.userService.getUser(order.userId)
//         }).pipe(
//           map(({ address, user }) => ({
//             ...order,
//             adressFullname: address ? address.fullname : 'Unknown Address',
//             username: user ? `${user.name} ${user.surname}` : 'Unknown User'
//           }))
//         )
//       );
//       return forkJoin(ordersWithDetails$);
//     })
//   );
// }
