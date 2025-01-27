import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { StatsComponent } from "./home/stats/stats.component";
import { ContactComponent } from "./contact/contact.component";
import { FAQsComponent } from "./faqs/faqs.component";
import { CartComponent } from "./cart/cart.component";
import { AboutComponent } from "./about/about.component";
import { MostPopularComponent } from "./home/most-popular/most-popular.component";
import { FavoriteComponent } from "./favorite/favorite.component";
import { CartConfirmComponent } from "./cart/cart-confirm/cart-confirm.component";
import { RouterModule } from "@angular/router";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { ProfileModule } from "./profile/profile.module";
import { ProductModule } from "./product/product.module";
import { AccountModule } from "./account/account.module";
import { AdminModule } from "./admin/admin.module";
import { SharedModule } from "./shared/shared.module";
import { OrderModule } from "./order/order.module";
import { CartModule } from "./cart/cart.module";
import { LayoutModule } from "./layout/layout.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./services/in-memory-data.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    StatsComponent,
    ContactComponent,
    FAQsComponent,
    CartComponent,
    AboutComponent,
    MostPopularComponent,
    CartComponent,
    FavoriteComponent,
    CartConfirmComponent,
  ],
  imports: [
    RouterModule,
    CKEditorModule,
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
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false })
  ],
  exports: [
    // CarouselComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
