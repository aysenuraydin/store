import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { DetailComponent } from './product-detail/detail/detail.component';
import { DescriptionComponent } from './product-detail/description/description.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { PaginationComponent } from './pagination/pagination.component';
import { RecentlyViewedComponent } from './recently-viewed/recently-viewed.component';
import { PComponent } from './p/p.component';
import { CommentComponent } from './product-detail/comment/comment.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailComponent,
    ProductListComponent,
    DetailComponent,
    DescriptionComponent,
    CategoriesComponent,
    PaginationComponent,
    RecentlyViewedComponent,
    PComponent,
    CommentComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ],
  exports: [
    PComponent,
    PaginationComponent,
    RecentlyViewedComponent,
  ]
})
export class ProductModule { }


