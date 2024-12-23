import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { BannerComponent } from './banner/banner.component';
import { SliderComponent } from './slider/slider.component';
import { CategoriesComponent } from './categories/categories.component';
import { RolesComponent } from './roles/roles.component';
import { MessagesComponent } from './messages/messages.component';
import { InformationsComponent } from './informations/informations.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';
import { SubscribesComponent } from './subscribes/subscribes.component';
import { CommentsComponent } from './comments/comments.component';
import { LayoutModule } from '../layout/layout.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent,
    BannerComponent,
    SliderComponent,
    CategoriesComponent,
    RolesComponent,
    MessagesComponent,
    InformationsComponent,
    OrdersComponent,
    SubscribesComponent,
    ProductsComponent,
    UsersComponent,
    SubscribesComponent,
    CommentsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    SharedModule,
    LayoutModule,
    FormsModule,
  ]
})
export class AdminModule { }
