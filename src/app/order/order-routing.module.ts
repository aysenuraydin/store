import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserLayoutComponent } from "../layout/user-layout/user-layout.component";
import { OrderdetailsComponent } from "./orderdetails/orderdetails.component";
import { OrderComponent } from "./order.component";
import { UserGuard } from "../guard/user.guard";

const routes: Routes = [
  {
      path: '',
      canActivate: [UserGuard],
      component: UserLayoutComponent,
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

