import { Component } from '@angular/core';
import { Order } from '../../models/order';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'cart-confirm',
  templateUrl: './cart-confirm.component.html',
  styles: [``]
})
export class CartConfirmComponent {
  order: Order = new Order();
  id: number =0;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.id= Number(this.route.snapshot.paramMap.get('id'));
    // this.getOrder(id);
  }

  // getOrder(id:number):void{
  //   this.orderService.getOrder(id)
  //       .subscribe(
  //         (data) => {
  //           this.order = data;
  //       }
  //     );
  // }
}
