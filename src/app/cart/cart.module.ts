import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';

@NgModule({
  declarations: [

  ],
  imports: [
    RouterModule,
    CommonModule,
    CartRoutingModule,
    SharedModule
  ],
  exports: [

  ]
})
export class CartModule { }


