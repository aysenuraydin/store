import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCartsComponent } from './add-carts/add-carts.component';
import { AddFavComponent } from './add-fav/add-fav.component';
import { AddProductModalComponent } from './add-product/add-product.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { AppRoutingModule } from '../app-routing.module';
import { CarouselComponent } from '../home/carousel/carousel.component';

@NgModule({
  declarations: [
    AddCartsComponent,
    AddFavComponent,
    AddProductModalComponent,
    SearchBarComponent,
    CarouselComponent,
    ScrollTopComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    AddCartsComponent,
    AddFavComponent,
    AddProductModalComponent,
    SearchBarComponent,
    CarouselComponent,
    ScrollTopComponent
  ],
})
export class SharedModule {}
