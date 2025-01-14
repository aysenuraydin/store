import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserLayoutComponent } from "../layout/user-layout/user-layout.component";
import { OrderdetailsComponent } from "./orderdetails/orderdetails.component";
import { OrderComponent } from "./order.component";

const routes: Routes = [
  {
      path: '',
      component: UserLayoutComponent,
      canActivate: [],
      children: [
        { path: '', component: OrderComponent  },
        { path: 'order-details/:id', component: OrderdetailsComponent }
      ]
    }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OrderRoutingModule { }

