import { Component } from '@angular/core';
import { Order, OrderList, OrderState } from '../models/order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  selected : any = 0;
  order: Order = new Order();
  orders: OrderList [] = [];
  buttonVisible:number = 1;
  adressName:string ="";
  activeOrderState?: OrderState | null = null;
  orderStates = Object.values(OrderState);
  OrderState = OrderState;

  constructor(
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }
  toggleWindow(value:number) :void {
    this.buttonVisible = value;
    this.cancel();
  }
  getOrders(state?:OrderState): void{

    this.activeOrderState = state;
      this.orderService.getOrdersWithFullname()
      .subscribe(
        (data) => {
          this.orders = (state == null) ? data : data.filter(i => i.orderState == state);
      }
    );
  }
  getTotal(order: Order): number{
    return order.orderItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  }
  getProductCount(order: Order): number{
    return order.orderItems.reduce((sum, item) => sum + item.quantity, 0);
  }
  cancel():void{
    this.order = new Order();
  }
}
