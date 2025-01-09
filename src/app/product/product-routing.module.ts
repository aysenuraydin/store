import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { UserLayoutComponent } from "../layout/user-layout/user-layout.component";


const routes: Routes = [
  {
      path: '',
      component: UserLayoutComponent,
      canActivate: [],
      children: [
        { path: 'product-list/:id?', component: ProductListComponent },
        { path: 'product-detail/:id', component: ProductDetailComponent }
      ]
    }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProductRoutingModule { }

