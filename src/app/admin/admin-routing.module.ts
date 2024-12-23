import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminLayoutComponent } from "../layout/admin-layout/admin-layout.component";
import { AdminComponent } from "./admin.component";
import { SliderComponent } from "./slider/slider.component";
import { ProductsComponent } from "./products/products.component";
import { CategoriesComponent } from "./categories/categories.component";
import { UsersComponent } from "./users/users.component";
import { RolesComponent } from "./roles/roles.component";
import { MessagesComponent } from "./messages/messages.component";
import { InformationsComponent } from "./informations/informations.component";
import { SubscribesComponent } from "./subscribes/subscribes.component";
import { CommentsComponent } from "./comments/comments.component";
import { BannerComponent } from "./banner/banner.component";
import { OrdersComponent } from "./orders/orders.component";

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: AdminComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'banner', component: BannerComponent },
      { path: 'slider', component: SliderComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'users', component: UsersComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'informations', component: InformationsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'subscribes', component: SubscribesComponent },
      { path: 'comments', component: CommentsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }

