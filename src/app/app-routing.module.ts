import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FAQsComponent } from './faqs/faqs.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { UserGuard } from './guard/user.guard';

const routes: Routes = [
  {
    path: 'product',
    loadChildren: () => import('./product/product-routing.module').then((m) => m.ProductRoutingModule),
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account-routing.module').then((m) => m.AccountRoutingModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin-routing.module').then((m) => m.AdminRoutingModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile-routing.module').then((m) => m.ProfileRoutingModule),
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order-routing.module').then((m) => m.OrderRoutingModule),
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart-routing.module').then((m) => m.CartRoutingModule),
  },
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'faqs', component: FAQsComponent },
      { path: 'not-found', component: NotFoundComponent },
      { path: 'fav', component: FavoriteComponent, canActivate: [UserGuard], },

      { path: '**', component: NotFoundComponent }

      //{ path: '', redirectTo: '/categories', pathMatch: 'full' }, // Ana sayfa yönlendirmesi
      //{ path: '**', redirectTo: '/categories' } // Hatalı rota yönlendirmesi
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
