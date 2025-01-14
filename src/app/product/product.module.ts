import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { DetailComponent } from './product-detail/detail/detail.component';
import { DescriptionComponent } from './product-detail/description/description.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductRoutingModule } from './product-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { RecentlyViewedComponent } from './recently-viewed/recently-viewed.component';
import { CommentComponent } from './product-detail/comment/comment.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './product.component';
import { BreadcrumbComponent } from './product-detail/breadcrumb/breadcrumb.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailComponent,
    ProductListComponent,
    DetailComponent,
    DescriptionComponent,
    CategoriesComponent,
    RecentlyViewedComponent,
    CommentComponent,
    BreadcrumbComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [DecimalPipe],
  exports: [
    RecentlyViewedComponent,
    ProductComponent,
  ]
})
export class ProductModule { }


