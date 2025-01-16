import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileComponent } from "./profile.component";
import { ProfileLayoutComponent } from "../layout/profile-layout/profile-layout.component";
import { SettingsComponent } from "./settings/settings.component";
import { CartComponent } from "../cart/cart.component";
import { FavoriteComponent } from "../favorite/favorite.component";
import { OrderComponent } from "../order/order.component";
import { UserGuard } from "../guard/user.guard";

const routes: Routes = [
  {
    path: '',
    canActivate: [UserGuard],
    component: ProfileLayoutComponent,
    children: [
      { path: '', component: ProfileComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'fav', component: FavoriteComponent },
      { path: 'order', component: OrderComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})

export class ProfileRoutingModule { }

