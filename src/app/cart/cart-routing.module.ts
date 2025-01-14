import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserLayoutComponent } from "../layout/user-layout/user-layout.component";
import { CartComponent } from "./cart.component";
import { CartConfirmComponent } from "./cart-confirm/cart-confirm.component";

const routes: Routes = [
  {
      path: '',
      component: UserLayoutComponent,
      canActivate: [],
      children: [
        { path: '', component: CartComponent  },
        { path: 'cart-confirm/:id', component: CartConfirmComponent }
      ]
    }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CartRoutingModule { }

