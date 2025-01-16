import { NgModule } from "@angular/core";
import { AdminComponent } from "./admin.component";
import { RouterModule, Routes } from "@angular/router";
import { UsersComponent } from "./users/users.component";
import { RolesComponent } from "./roles/roles.component";
import { OrdersComponent } from "./orders/orders.component";
import { BannerComponent } from "./banner/banner.component";
import { SliderComponent } from "./slider/slider.component";
import { ReviewsComponent } from "./reviews/reviews.component";
import { ProductsComponent } from "./products/products.component";
import { MessagesComponent } from "./messages/messages.component";
import { CategoriesComponent } from "./categories/categories.component";
import { SubscribesComponent } from "./subscribes/subscribes.component";
import { InformationsComponent } from "./informations/informations.component";
import { AdminLayoutComponent } from "../layout/admin-layout/admin-layout.component";
import { AdminGuard } from "../guard/admin.guard";

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    component: AdminLayoutComponent,
    children: [
      { path: '', component: AdminComponent},
      { path: 'admin', component: AdminComponent },
      { path: 'banner', component: BannerComponent },
      { path: 'slider', component: SliderComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'users', component: UsersComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'messages', component: MessagesComponent},
      // { path: 'messages', component: MessagesComponent ,resolve: { messages: MessageResolver },},
      { path: 'informations', component: InformationsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'subscribes', component: SubscribesComponent },
      { path: 'reviews', component:  ReviewsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }

