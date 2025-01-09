import { Component } from '@angular/core';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orders:number[]= [1,2,3,4,5,6,7,8];
  buttonVisible:boolean = true;

  toggleWindow(value:boolean) :void {
    this.buttonVisible = !value;
    // this.cancel();
  }
}
