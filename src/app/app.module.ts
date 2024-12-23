import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StatsComponent } from './home/stats/stats.component';
import { ContactComponent } from './contact/contact.component';
import { FAQsComponent } from './faqs/faqs.component';
import { CartComponent } from './cart/cart.component';
import { DenemeComponent } from './contact/deneme/deneme.component';
import { AboutComponent } from './about/about.component';
import { ProductModule } from './product/product.module';
import { CarouselComponent } from './home/carousel/carousel.component';
import { CollectionsComponent } from './home/collections/collections.component';
import { MostPopularComponent } from './home/most-popular/most-popular.component';
import { ProfileModule } from './profile/profile.module';
import { AccountModule } from './account/account.module';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { FavoriteComponent } from './favorite/favorite.component';
import { OrderModule } from './order/order.module';
import { CartConfirmComponent } from './cart/cart-confirm/cart-confirm.component';
import { CartModule } from './cart/cart.module';
import { AsdfghComponent } from './asdfgh/asdfgh.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    StatsComponent,
    ContactComponent,
    FAQsComponent,
    CartComponent,
    DenemeComponent,
    AboutComponent,
    CollectionsComponent,
    MostPopularComponent,
    CartComponent,
    FavoriteComponent,
    CartConfirmComponent,
    AsdfghComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProfileModule,
    ProductModule,
    AccountModule,
    AdminModule,
    SharedModule,
    OrderModule,
    CartModule,
    LayoutModule,
    FormsModule,
  ],
  exports: [
    CarouselComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
