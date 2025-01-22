import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCartsComponent } from './add-carts/add-carts.component';
import { AddFavComponent } from './add-fav/add-fav.component';
import { AddProductModalComponent } from './add-product/add-product.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { AppRoutingModule } from '../app-routing.module';
import { CarouselComponent } from '../home/carousel/carousel.component';
import { AlertsComponent } from './alerts/alerts.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CktextComponent } from './cktext/cktext.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AddFavComponent,
    AddProductModalComponent,
    CarouselComponent,
    ScrollTopComponent,
    AlertsComponent,
    PaginationComponent,
    CktextComponent,
    AddCartsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    // FavoriteComponent
  ],
  exports: [
    AddCartsComponent,
    AddFavComponent,
    AddProductModalComponent,
    CarouselComponent,
    ScrollTopComponent,
    AlertsComponent,
    PaginationComponent,
    CktextComponent
  ],
})
export class SharedModule {}
