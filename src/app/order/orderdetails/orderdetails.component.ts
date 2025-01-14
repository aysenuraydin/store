import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order, OrderList, OrderState } from '../../models/order';

@Component({
  selector: 'orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrl: './orderdetails.component.css'
})
export class OrderdetailsComponent {
  order: OrderList = new OrderList();
  buttonVisible:boolean = true;

  orderStates = Object.values(OrderState);
  OrderState = OrderState;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.getOrder(id);
  }

  toggleWindow(value:boolean) :void {
    this.buttonVisible = !value;
  }

  getOrder(id:number):void{
    this.orderService.getOrderWithFullname(id)
    .subscribe(
      (data) => {
        this.order = data;
    }
  );
  }
  getTotal(order: Order): number{
    return order.orderItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  }
  getProductCount(order: Order): number{
    return order.orderItems.reduce((sum, item) => sum + item.quantity, 0);
  }
}
