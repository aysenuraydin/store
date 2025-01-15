import { Component } from '@angular/core';
import { Order, OrderState } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { AdressItemService } from '../../services/adress.service';
import { AdressItem } from '../../models/adressItem';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  order: Order = new Order();
  orders: Order [] = [];
  buttonVisible:boolean = true;
  orderStates = Object.values(OrderState);
  OrderState = OrderState
  adress: AdressItem = new AdressItem();
  activeOrderState?: OrderState | null = null;

  constructor(
    private orderService: OrderService,
    private adressItemService: AdressItemService
  ){ }

  ngOnInit(): void {
    this.getOrders();
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
      }
    );
  }

  getOrder(id:number): void{
    this.orderService.getOrderWithFullname(id)
        .subscribe(
          (data) => {
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
      this.getOrder(order.id);
      this.toggleWindow(this.buttonVisible)
    });
  }
  cancel():void{
    this.order = new Order();
  }
}
