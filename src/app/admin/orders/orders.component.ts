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
  activeOrderState?: OrderState = undefined;
  search:string = "";
  pageNumber:number = 1;
  pageSize:number = 6;
  pageTotal:number = 1;

  constructor(
    private orderService: OrderService,
    private adressItemService: AdressItemService
  ){ }

  ngOnInit(): void {
    this.getOrders();
  }
  Search() {
    this.activeOrderState= undefined;
    this.pageNumber=1;
    this.getQueryOrders();
  }
  onInputChange(event: Event) {
    this.activeOrderState= undefined;
    this.pageNumber=1;
    this.search = (event.target as HTMLInputElement).value;
    this.getQueryOrders();
  }
  Clear() {
    this.activeOrderState= undefined;
    this.pageNumber=1;
    this.search = "";
    this.getOrders();
  }
  getQueryOrders(state?:OrderState): void{
    this.activeOrderState = state;
      this.orderService.searchOrders(this.search,this.pageNumber, this.pageSize,state)
      .subscribe(
        (data) => {
          this.orders = data.products;
          this.pageTotal = data.totalPages;
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
      this.orderService.getOrdersWithFullname(this.pageNumber, this.pageSize,state)
      .subscribe(
        (data) => {
          this.orders = data.products;
          this.pageTotal = data.totalPages;
      }
    );
  }
  filterByOrderState(state?:OrderState){
    if(this.search.length == 0) this.getOrders(state);
    else this.getQueryOrders(state);
  }
  getPageNumber(pageNumber:number){
    this.pageNumber = pageNumber
    if(this.search.length==0) this.getOrders(this.activeOrderState);
    else this.getQueryOrders(this.activeOrderState);
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
    this.buttonVisible=true;
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
