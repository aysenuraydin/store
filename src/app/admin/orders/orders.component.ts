import { Component } from '@angular/core';
import { Order, OrderList, OrderState } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { AdressItemService } from '../../services/adress.service';
import { AdressItem } from '../../models/adressItem';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styles: [``]
})
export class OrdersComponent {
  order: OrderList & { username: string; } = Object.assign(
      new OrderList(), {username: '' }
    );
  orders: (OrderList & { username: string; }) [] = [];
  buttonVisible:boolean = true;
  orderStates = Object.values(OrderState);
  OrderState = OrderState
  adress: AdressItem = new AdressItem();
  activeOrderState?: OrderState | null = null;
  search:string = "";

  constructor(
    private orderService: OrderService,
    private adressItemService: AdressItemService
  ){ }

  ngOnInit(): void {
    this.getOrders();
  }
  Search() {
    this.getQueryOrders();
  }
  onInputChange(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
    this.getQueryOrders();
  }
  Clear() {
    this.search = "";
    this.getOrders();
  }
  getQueryOrders(): void{
    this.orderService.searchOrders(this.search)
        .subscribe(
          (data) => {
            this.orders = data;
        }
      );
  }
  getTotal(order: Order): number{
    return order.orderItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  }
  getProductCount(): number{
    return this.order.orderItems.reduce((sum, item) => sum + item.quantity, 0);
  }
  toggleWindow(value:boolean) :void {
    this.buttonVisible = !value;
    this.cancel();
  }
  getOrders(state?:OrderState): void{
    this.activeOrderState = state;
    this.orderService.getOrdersWithFullname()
      .subscribe(
        (data) => {
          this.orders = (state == null)? data : data.filter(i => i.orderState == state);
          this.toggleWindow(this.buttonVisible)
      }
    );
  }
  getOrder(id:number): void{
    this.orderService.getOrderWithFullname(id)
        .subscribe(
          (data) => {
            this.toggleWindow(true)
            this.order = data;
            this.getAdress(data.adressId)
        }
      );
  }
  getAdress(id:number): void{
    this.adressItemService.getAdressItem(id)
        .subscribe(
          (data) => {
            this.adress = data;
        }
      );
  }
  updateOrder(order:Order):void{
    this.orderService.updateOrder(order)
    .subscribe((data) => {
      this.getOrders();
    });
  }
  cancel():void{
    this.order = Object.assign(
      new OrderList(), {username: '' }
    );
  }
}
