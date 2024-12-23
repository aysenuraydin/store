import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { OrderComponent } from './order.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { OrderRoutingModule } from './order-routing.module';

@NgModule({
  declarations: [
    OrderComponent,
    OrderdetailsComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    OrderRoutingModule,
    SharedModule
  ],
  exports: [

  ]
})
export class OrderModule { }


